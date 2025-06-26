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

  // const giftCard = [
  //   {
  //     id: 1,
  //     image:
  //       "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
  //     name: "Gift Card",
  //     description: "Gift Card for your loved ones",
  //     price: 500,
  //     category: "Gift Card",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
  //     name: "Gift Card",
  //     description: "Gift Card for your loved ones",
  //     price: 1000,
  //     category: "Gift Card",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
  //     name: "Gift Card",
  //     description: "Gift Card for your loved ones",
  //     price: 1500,
  //     category: "Gift Card",
  //   },
  // ];

  const addToCart = async (itemId, size) => {
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

  const parseOffers = (offerArray) => {
    try {
      const offers = JSON.parse(offerArray[0]); // it's a JSON string inside an array
      return offers.map((offerStr) => {
        const [_, qty, __, price] = offerStr.split(" ");
        return {
          raw: offerStr,
          quantity: parseInt(qty),
          price: parseInt(price),
        };
      });
    } catch (e) {
      return [];
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    const offerMap = {}; // Map offer key like "Buy 2 at 299" to product entries
    const regularItems = [];

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      const offers = parseOffers(product.offers);

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];

        if (offers.length > 0) {
          offers.forEach((offer) => {
            const key = `${offer.quantity}@${offer.price}`;
            if (!offerMap[key]) offerMap[key] = [];
            offerMap[key].push({ product, quantity });
          });
        } else {
          regularItems.push({ product, quantity });
        }
      }
    }

    // Apply grouped offers
    for (const key in offerMap) {
      const [offerQty, offerPrice] = key.split("@").map(Number);
      const items = offerMap[key];

      // Total combined quantity of all products in this offer group
      let totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
      const eligibleGroups = Math.floor(totalQty / offerQty);
      const remainingItems = totalQty % offerQty;

      totalAmount += eligibleGroups * offerPrice;

      // Add normal price for remaining items
      let remaining = remainingItems;
      for (const item of items) {
        if (remaining <= 0) break;
        const count = Math.min(remaining, item.quantity);
        totalAmount += count * item.product.price;
        remaining -= count;
      }
    }

    // Add items that don't have offers
    for (const item of regularItems) {
      totalAmount += item.quantity * item.product.price;
    }

    return totalAmount;
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
  // Helper: Parse offer string like "Buy 5 at 599" into {quantity, price}

  // const getCartAmount = () => {
  //   let totalAmount = 0;

  //   for (const itemId in cartItems) {
  //     for (const size in cartItems[itemId]) {
  //       const quantity = cartItems[itemId][size];
  //       if (quantity > 0) {
  //         // Check if it's a gift card
  //         const gift = giftCard.find((g) => String(g.id) === String(itemId));
  //         if (gift) {
  //           totalAmount += gift.price * quantity;
  //         } else {
  //           const product = products.find((p) => p._id === itemId);
  //           if (product) totalAmount += product.price * quantity;
  //         }
  //       }
  //     }
  //   }

  //   return totalAmount;
  // };

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
