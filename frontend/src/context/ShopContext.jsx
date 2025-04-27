import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [couponCode, setCouponCode] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    // if (!size) {
    //     toast.error('Select Product Size');
    //     return;
    // }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCouponCode = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/coupon/list");
      if (response.data.success) {
        setCouponCode(response.data.coupon.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // const getCartAmount = () => {
  //   const totalQuantity = Object.values(cartItems).reduce(
  //     (sum, obj) => sum + obj[""],
  //     0
  //   );

  //   let totalAmount = 0;
  //   let offerApplied = false;

  //   for (const itemId in cartItems) {
  //     const itemInfo = products.find((product) => product._id === itemId);
  //     const quantity = cartItems[itemId][""];

  //     if (itemInfo.offers && itemInfo.offers.startsWith("Buy")) {
  //       // Parse the offer, e.g., "Buy 5 at 599"
  //       const offerParts = itemInfo.offers.split(" ");
  //       const offerQuantity = parseInt(offerParts[1]); // e.g., 5
  //       const offerPrice = parseInt(offerParts[3]); // e.g., 599

  //       if (totalQuantity === offerQuantity) {
  //         // Exactly offerQuantity = apply offer
  //         totalAmount = offerPrice;
  //         offerApplied = true;
  //       } else if (totalQuantity > offerQuantity) {
  //         if (!offerApplied) {
  //           // Only add offerPrice ONCE for first offerQuantity items
  //           totalAmount = offerPrice;
  //           offerApplied = true;
  //         }
  //         // Add price for extra items beyond offerQuantity
  //         const extraItems = totalQuantity - offerQuantity;
  //         totalAmount += extraItems * itemInfo.price;
  //         break;
  //       } else {
  //         // Less than offerQuantity, no offer, normal pricing
  //         totalAmount += itemInfo.price * quantity;
  //       }
  //     } else {
  //       // No offer on this product
  //       totalAmount += itemInfo.price * quantity;
  //     }
  //   }

  //   return totalAmount;
  // };
  // Helper: Parse offer string like "Buy 5 at 599" into {quantity, price}
  const parseOffer = (offerString) => {
    const parts = offerString.split(" ");
    return {
      quantity: parseInt(parts[1], 10), // 5
      price: parseInt(parts[3], 10), // 599
    };
  };

  // Helper: Calculate total for one product
  const calculateItemTotal = (itemInfo, quantity) => {
    if (itemInfo.offers && itemInfo.offers.startsWith("Buy")) {
      const { quantity: offerQty, price: offerPrice } = parseOffer(
        itemInfo.offers
      );

      if (quantity >= offerQty) {
        const bundles = Math.floor(quantity / offerQty);
        const leftovers = quantity % offerQty;
        return bundles * offerPrice + leftovers * itemInfo.price;
      }
    }
    // No valid offer or quantity not enough
    return quantity * itemInfo.price;
  };

  // Main Function: Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      const quantity = cartItems[itemId][""]; // Assuming "" is the quantity key

      if (itemInfo) {
        totalAmount += calculateItemTotal(itemInfo, quantity);
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
    getCouponCode();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    couponCode,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
