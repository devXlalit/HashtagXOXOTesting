import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { fbqTrack } from "../../utils/MetaPixel";
import ccavenueLogo from "../assets/ccavenue.webp";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [cartData, setCartData] = useState([]);
  const [paymentData, setPaymentData] = useState(null);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
    updateQuantity,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }

    fbqTrack("InitiateCheckout", {
      num_items: cartData.length,
      contents: cartData.map((i) => ({
        id: i._id,
        quantity: i.quantity,
        item_price:
          i.price || products.find((p) => p._id === i._id)?.price || 0,
      })),
      value: getCartAmount(),
      currency: "INR",
      content_type: "product",
    });
  }, [cartItems, products]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token && method !== "cod") {
      alert("Please login first!");
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
        // userId: token,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            // --- Call Meta Pixel Purchase API ---
            try {
              await axios.post(backendUrl + "/api/order/meta/purchase", {
                eventId: "purchase_" + Date.now(),
                orderId: response.data.orderId || "", // If you return orderId from backend
                total: orderData.amount,
                currency: "INR",
                items: orderItems.map((item) => ({
                  id: item._id,
                  quantity: item.quantity,
                  item_price: item.price,
                })),
                email: formData.email,
                phone: formData.phone,
                eventSourceUrl: window.location.href,
              });
            } catch (err) {
              // Optionally log or ignore pixel errors
              console.log("Meta Pixel Purchase error", err);
            }
            // --- End Meta Pixel Call ---

            setCartItems({});

            if (response.data.isGuest) {
              alert("Order placed successfully as guest!");
              navigate("/");
            } else {
              navigate("/orders");
            }
          } else {
            toast.error(response.data.message);
          }
          break;

        case "ccavenue":
          const ccavenueResponse = await axios.post(
            backendUrl + "/api/order/ccavenue",
            orderData,
            { headers: { token } }
          );

          if (ccavenueResponse.data.success) {
            setPaymentData(ccavenueResponse.data);
          } else {
            toast.error("Payment failed to initialize.");
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Auto-submit CCAvenue form
  useEffect(() => {
    if (paymentData) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = paymentData.ccavenue_url;

      const encRequestInput = document.createElement("input");
      encRequestInput.type = "hidden";
      encRequestInput.name = "encRequest";
      encRequestInput.value = paymentData.encRequest;
      form.appendChild(encRequestInput);

      const accessCodeInput = document.createElement("input");
      accessCodeInput.type = "hidden";
      accessCodeInput.name = "access_code";
      accessCodeInput.value = paymentData.access_code;
      form.appendChild(accessCodeInput);

      document.body.appendChild(form);
      form.submit();
    }
  }, [paymentData]);

  return (
    <>
      <div className="px-10 my-10">
        <Title title={"Cart Details"} />

        {/* Check if cartData contains a gift card */}
        {cartData.map((item, index) => {
          // Try to find a matching gift card

          // Fallback to normal product rendering
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className="py-4 mt-5 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className=" flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData?.image[0]}
                  alt="image"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData?.name}
                  </p>
                  <div className="flex items-center text-[#9A3B3B] gap-5 mt-2">
                    <p>₹{productData?.price}</p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="flex px-10 flex-col mb-10 sm:flex-row justify-between gap-4 sm:pt-14 min-h-[80vh] border-t"
      >
        {/* ------------- Left Side ---------------- */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[650px]">
          <div className=" text-left  my-3">
            <Title title={"Delivery Information"} />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First name"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
          />
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
            />
            <input
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onChangeHandler}
              name="country"
              value={formData.country}
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
          />
        </div>

        {/* ------------- Right Side ------------------ */}
        <div className="mt-8 md:w-1/2">
          <div className="">
            <CartTotal />
          </div>

          <div className="mt-12">
            <h1 className="text-2xl text-[#ff8787] font-medium opacity-90 pb-4">
              Payment Method
            </h1>
            {/* --------------- Payment Method Selection ------------- */}
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("ccavenue")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "ccavenue" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img className="h-4 mx-4" src={ccavenueLogo} alt="" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-[#ff8787] text-white px-16 py-3 text-sm"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
