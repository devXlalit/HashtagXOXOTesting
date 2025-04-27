import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true },
  discount: { type: Number, required: true, required: true },
});

const userModel =
  mongoose.models.coupons || mongoose.model("coupons", couponSchema);

export default userModel;
