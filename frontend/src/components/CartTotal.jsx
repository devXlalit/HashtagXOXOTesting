import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoIosArrowDown } from "react-icons/io";

const CartTotal = () => {
  const { getCartAmount, cartItems, couponCode, offerApplied } =
    useContext(ShopContext);
  const [couponInput, setCouponInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const handleApplyCoupon = () => {
    if (offerApplied) {
      alert("Only one offer can be applied at a time!");
      return;
    }
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
    <div className="w-full ">
      <div className="text-2xl w-full">
        <h1 className="text-[#ff8787] font-medium opacity-80">CART TOTAL</h1>{" "}
        <span className="text-lg animate-pulse w-full text-red-500">
          Buy products upto 1500/- and get a free product worth upto 200/-
        </span>
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
            onChange={(e) => {
              setCouponInput(e.target.value);
            }}
            className="border border-gray-300 rounded-lg px-2 py-2 mt-2 w-1/3 outline-none"
            placeholder="Enter coupon code"
          />
          <button
            type="button" // Prevents form submission
            disabled={!couponInput.trim()}
            onClick={handleApplyCoupon}
            className="text-white ml-1 bg-[#ff8787] text-sm px-5 rounded-lg py-2 font-medium"
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
