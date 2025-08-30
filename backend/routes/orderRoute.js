import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  placeOrderCCAvenue,
  metaPurchase,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import { handleCCAvenueResponse } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", placeOrder);
orderRouter.post("/meta/purchase", metaPurchase);

orderRouter.post("/ccavenue", placeOrderCCAvenue);
orderRouter.post(
  "/ccavenue/response",
  express.urlencoded({ extended: true }),
  handleCCAvenueResponse
);

orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
