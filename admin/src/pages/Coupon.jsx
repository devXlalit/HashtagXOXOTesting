import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Coupon = ({ token }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/coupon/list");
      if (response.data.success) {
        setList(response.data.coupon.reverse());
        // console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/coupon/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchList();
  }, [code]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("code", code);
      formData.append("discount", discount);

      const response = await axios.post(
        backendUrl + "/api/coupon/add",
        { code, discount: Number(discount) },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setCode("");
        setDiscount(0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col w-full items-start gap-3"
      >
        <input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          required
          placeholder="Create Coupon code"
        />
        <input
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
          className="w-full max-w-[500px] px-3 py-2"
          type="number"
          required
          placeholder="Coupon Discount (in %)"
        />
        <button
          type="submit"
          className="w-28 py-3 mt-4 bg-[#212529] text-white"
        >
          ADD
        </button>
      </form>
      <div className="my-10">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Coupon Code</b>
          <b>Discount %</b>

          <b className="text-center">Remove coupon</b>
        </div>
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <p>{item.code}</p>
            <p>{item.discount}%</p>

            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg text-[#fa5252]"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Coupon;
