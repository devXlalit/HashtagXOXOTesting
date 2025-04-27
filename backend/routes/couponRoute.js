import express from "express";
import {
  addCoupon,
  listCoupon,
  removeCoupon,
} from "../controllers/couponController.js";

import adminAuth from "../middleware/adminAuth.js";

const couponRoute = express.Router();

couponRoute.post("/add", adminAuth, addCoupon);
couponRoute.post("/remove", adminAuth, removeCoupon);
couponRoute.get("/list", listCoupon);

export default couponRoute;
