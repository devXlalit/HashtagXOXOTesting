import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoIosArrowDown } from "react-icons/io";

const CartTotal = () => {
  const { getCartAmount, couponCode } = useContext(ShopContext);
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const handleApplyCoupon = () => {
    const foundCoupon = couponCode.find(
      (coupon) => coupon.code.toLowerCase() === couponInput.toLowerCase()
    );
    if (foundCoupon) {
      setAppliedDiscount(foundCoupon.discount);
    } else {
      setAppliedDiscount(0);
      alert("Invalid coupon code");
    }
  };

  const subtotal = getCartAmount();
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <h1 className="text-[#DF4C84] font-medium opacity-80">CART TOTAL</h1>
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div>
          <span className="flex items-center gap-2">
            <p>Add a Coupon</p>
            <IoIosArrowDown />
          </span>
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-2 mt-2 w-1/3 outline-none"
            placeholder="Enter coupon code"
          />
          <button
            onClick={handleApplyCoupon}
            className="text-white ml-1 bg-[#DF4C84] text-sm px-5 rounded-lg py-2 font-medium"
          >
            APPLY
          </button>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>₹ {subtotal.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <p>Coupon Discount</p>
          <p>-₹ {discountAmount.toFixed(2)}</p>
        </div>

        <hr />

        <div className="flex justify-between">
          <b>Total</b>
          <b>₹ {total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
