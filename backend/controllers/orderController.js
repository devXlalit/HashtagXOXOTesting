import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import nodeCCAvenue from "node-ccavenue";

const ccav = new nodeCCAvenue.Configure({
  merchant_id: process.env.MERCHANT_ID,
  working_key: process.env.WORKING_KEY,
});

// Helper function to encode order data
const encodeOrderData = (orderData) => {
  return Object.keys(orderData)
    .map((key) => `${key}=${encodeURIComponent(orderData[key])}`)
    .join("&");
};

// Place order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

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

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Place order using CCAvenue
const placeOrderCCAvenue = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
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
      redirect_url: process.env.REDIRECT_URL,
      cancel_url: process.env.CANCEL_URL,
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
    const encryptedData = ccav.encrypt(encodeOrderData(orderDetails));

    res.status(200).json({
      success: true,
      encRequest: encryptedData,
      access_code: process.env.ACCESS_CODE,
      ccavenue_url: process.env.CCAVENUE_URL,
    });
  } catch (error) {
    console.error("CCAvenue Order Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Handle CCAvenue response
const handleCCAvenueResponse = async (req, res) => {
  try {
    const { encResp } = req.body;
    const decryptedData = ccav.decrypt(encResp);

    // Parse decrypted data
    const responseData = new URLSearchParams(decryptedData);
    const orderStatus = responseData.get("order_status");
    const orderId = responseData.get("order_id");
    const trackingId = responseData.get("tracking_id");
    const amount = responseData.get("amount");

    // Update order in database
    const updateData = {
      payment: orderStatus === "Success",
      status: orderStatus === "Success" ? "Paid" : orderStatus,
      tracking_id: trackingId || null,
    };

    await orderModel.findByIdAndUpdate(orderId, updateData);

    // Redirect to frontend with status
    const redirectUrl = `${
      process.env.CANCEL_URL
    }?status=${orderStatus.toLowerCase()}&order_id=${orderId}${
      trackingId ? `&tracking_id=${trackingId}` : ""
    }`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("CCAvenue Response Error:", error);
    res.redirect(`${process.env.CANCEL_URL}?status=error`);
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
};
