import couponModel from "../models/couponModel.js";

// function for add product
const addCoupon = async (req, res) => {
  try {
    const { code, discount } = req.body;

    const couponData = {
      code,
      discount,
    };

    console.log(couponData);

    const newCoupon = new couponModel(couponData);
    await newCoupon.save();

    res.json({ success: true, message: "Coupon Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listCoupon = async (req, res) => {
  try {
    const coupon = await couponModel.find({});
    res.json({ success: true, coupon });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeCoupon = async (req, res) => {
  try {
    await couponModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Coupon Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addCoupon, listCoupon, removeCoupon };
