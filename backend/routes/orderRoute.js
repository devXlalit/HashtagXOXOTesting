import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  placeOrderCCAvenue,
  handleCCAvenueResponse,
} from "../controllers/orderController.js";
const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);
// Payment Features
// orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/place", placeOrder);

// orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/ccavenue", authUser, placeOrderCCAvenue);
orderRouter.post("/ccavenue/response", authUser, handleCCAvenueResponse);
// orderRouter.post("/ccavenue/resonse", authUser, postRes);

// User Feature
orderRouter.post("/userorders", authUser, userOrders);

// verify payment
// orderRouter.post("/verifyStripe", authUser, verifyStripe);
// orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

export default orderRouter;
