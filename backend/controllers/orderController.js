import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import nodeCCAvenue from "node-ccavenue";
// import { encrypt, decrypt } from "../utils/ccavutils.js";
import querystring from "querystring";
import jwt from "jsonwebtoken";

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE;

const ccav = new nodeCCAvenue.Configure({
  merchant_id: process.env.MERCHANT_ID,
  working_key: process.env.WORKING_KEY,
});
function sha256Norm(value) {
  if (!value) return undefined;
  return crypto
    .createHash("sha256")
    .update(String(value).trim().toLowerCase())
    .digest("hex");
}

function getCookie(req, name) {
  const match = (req.headers.cookie || "").match(
    new RegExp(`(?:^|; )${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

const encodeOrderData = (orderData) => {
  return Object.keys(orderData)
    .map((key) => `${key}=${encodeURIComponent(orderData[key])}`)
    .join("&");
};

const metaPurchase = async (req, res) => {
  try {
    const {
      eventId,
      orderId,
      total,
      currency = "INR",
      items,
      email,
      phone,
      eventSourceUrl,
    } = req.body;
    const payload = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: eventSourceUrl,
          action_source: "website",
          event_id: eventId,
          user_data: {
            em: email ? [sha256Norm(email)] : undefined,
            ph: phone ? [sha256Norm(phone)] : undefined,
            client_user_agent: req.get("user-agent"),
            client_ip_address: req.ip,
            fbp: getCookie(req, "_fbp"),
            fbc: getCookie(req, "_fbc"),
          },
          custom_data: {
            currency,
            value: Number(total),
            order_id: orderId,
            contents: items,
            content_type: "product",
            num_items: items?.reduce((n, i) => n + (i.quantity || 0), 0),
          },
        },
      ],
      test_event_code: TEST_EVENT_CODE || undefined,
    };

    const url = `https://graph.facebook.com/v20.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    res.status(response.ok ? 200 : 400).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Place order using COD method
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const token = req.headers.token;

    let userId;
    let isGuest = false;

    if (!token || token.startsWith("guest")) {
      isGuest = true;
      userId = "guest" + Math.floor(Math.random() * 100000);
    } else {
      // ✅ decode the token to extract real user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id || decoded._id; // depends on how you signed it
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    if (!isGuest && userId && mongoose.Types.ObjectId.isValid(userId)) {
      await userModel.findByIdAndUpdate(userId, {
        $set: { cartData: {} },
        $push: { orders: newOrder._id },
      });
    }

    res.json({
      success: true,
      message: isGuest
        ? "Order placed successfully as guest"
        : "Order placed successfully",
      isGuest,
    });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
// Place order using CCAvenue
const placeOrderCCAvenue = async (req, res) => {
  try {
    let { userId, items, amount, address } = req.body;
    const token = req.headers.token;
    let isGuest = false;

    // Authenticated user logic (same as COD)
    if (!token || token.startsWith("guest")) {
      isGuest = true;
      userId = "guest" + Math.floor(Math.random() * 100000);
    } else {
      // Decode the token to extract real user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id || decoded._id;
    }

    if (!items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing order details" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "CCAvenue",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const orderId = newOrder._id.toString();

    // Prepare order details for CCAvenue
    const orderDetails = {
      merchant_id: process.env.MERCHANT_ID,
      order_id: orderId,
      currency: "INR",
      amount: amount.toString(),
      redirect_url: encodeURIComponent(process.env.REDIRECT_URL),
      cancel_url: encodeURIComponent(process.env.CANCEL_URL),
      language: "EN",
      billing_name: `${address.firstName} ${address.lastName}`,
      billing_address: address.street,
      billing_city: address.city,
      billing_state: address.state,
      billing_zip: address.zipcode,
      billing_country: address.country,
      billing_tel: address.phone,
      billing_email: address.email,
      integration_type: "iframe_normal",
    };

    // Encrypt order data
    const encryptedData = ccav.getEncryptedOrder(orderDetails);
    console.log("Encrypted CCAvenue order data:", encryptedData);

    res.status(200).json({
      success: true,
      encRequest: encryptedData,
      access_code: process.env.ACCESS_CODE,
      ccavenue_url: process.env.CCAVENUE_URL,
      isGuest,
    });
  } catch (error) {
    console.error("CCAvenue Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const handleCCAvenueResponse = async (req, res) => {
  try {
    console.log("CCAvenue response body:", req.body); // Add this line
    const { encResp } = req.body;

    if (!encResp) {
      console.error("encResp missing in CCAvenue response!");
      return res.redirect(`${process.env.CANCEL_URL}?status=missing_encResp`);
    }

    let decryptedData;
    try {
      decryptedData = ccav.redirectResponseToJson(encResp);
    } catch (err) {
      console.error("Decrypt failed:", err);
      const url = `${process.env.FRONTEND_URL_CANCEL}?status=decrypt_error`;
      return res.status(200).send(toFrontendHtml(url));
    }

    console.log("Decrypted CCAvenue payload:", decryptedData);

    const orderStatus = decryptedData.order_status;
    const orderId = decryptedData.order_id;
    const trackingId = decryptedData.tracking_id;
    const amount = decryptedData.amount;

    console.log("CCAvenue Response:", {
      orderStatus,
      orderId,
      trackingId,
      amount,
      decryptedData,
    });
    // Check if orderId is valid
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.error("Invalid orderId from CCAvenue:", orderId);
      return res.redirect(`${process.env.CANCEL_URL}?status=invalid_order`);
    }

    const isSuccess = ["Success", "successful", "y"].includes(orderStatus);

    // Build update payload
    const updateData = {
      payment: isSuccess,
      status: isSuccess ? "Order Placed" : orderStatus || "Failed",
    };
    if (trackingId) updateData.tracking_id = trackingId; // optional

    // Update DB
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    );
    if (!updatedOrder) {
      console.error("❌ Order not found or not updated:", orderId);
      return res.redirect(`${process.env.CANCEL_URL}?status=order_not_found`);
    }

    console.log("✅ Order updated:", updatedOrder);

    // Redirect to frontend with status
    const redirectUrl = `${process.env.FRONTEND_URL_SUCCESS}?status=${orderStatus}&order_id=${orderId}`;
    res.send(`<!doctype html>
     <html><head><meta charset="utf-8"></head>
     <body><script>
     window.top.location.href = "${redirectUrl}";
     </script></body></html>`);
  } catch (error) {
    console.error("CCAvenue Response Error:", error);
    res.redirect(`${process.env.FRONTEND_URL_CANCEL}?status=error`);
  }
};

// Get all orders (Admin Panel)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user orders (Frontend)
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status (Admin Panel)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  placeOrderCCAvenue,
  handleCCAvenueResponse,
  metaPurchase,
  // ccavResponseHandler,
};
