import mongoose from "mongoose";

const topHeadingSchema = new mongoose.Schema({
  heading: { type: String, required: true, required: true },
});

const userModel =
  mongoose.models.topheading || mongoose.model("topheading", topHeadingSchema);

export default userModel;
