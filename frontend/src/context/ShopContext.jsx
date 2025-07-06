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
  const [topHeading, setTopHeading] = useState("");
  const [token, setToken] = useState("");
  const [bannerImg, setBannerImg] = useState([]);
  const navigate = useNavigate();

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
          {
            withCredentials: true,
          },
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
      const response = await axios.get(backendUrl + "/api/coupon/list", {
        withCredentials: true,
      });
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

  const getTopHeading = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/heading/list", {
        withCredentials: true,
      });
      if (response.data.success) {
        setTopHeading(response.data.heading);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getBannerImage = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/get-images?folder=banner",
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        setBannerImg(response.data); // <-- set directly
      } else {
        toast.error("No images found");
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
          {
            withCredentials: true,
          },
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

    // 1. Build a map: offerString -> [{product, quantity, itemId}]
    const offerGroups = {}; // { offerString: [{product, quantity, itemId}] }
    const noOfferProducts = []; // [{product, quantity, itemId}]
    const productOffersMap = {}; // { productId: [offersArr] }

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;

      // Sum all sizes for this product
      let quantity = 0;
      for (const size in cartItems[itemId]) {
        quantity += cartItems[itemId][size];
      }
      if (quantity === 0) continue;

      // Parse offers array (handle your data structure)
      let offersArr = [];
      if (
        product.offers &&
        Array.isArray(product.offers) &&
        product.offers.length > 0
      ) {
        try {
          offersArr = JSON.parse(product.offers[0]);
        } catch (e) {
          offersArr = [];
        }
      }

      if (offersArr.length > 0) {
        productOffersMap[product._id] = offersArr;
        offersArr.forEach((offer) => {
          if (!offerGroups[offer]) offerGroups[offer] = [];
          offerGroups[offer].push({ product, quantity, itemId });
        });
      } else {
        noOfferProducts.push({ product, quantity, itemId });
      }
    }

    // 2. Parse all unique offers and sort by quantity descending (most relevant first)
    const parsedOffers = [];
    Object.keys(offerGroups).forEach((offerStr) => {
      const match = offerStr.match(/^Buy (\d+) at (\d+)$/);
      if (match) {
        parsedOffers.push({
          raw: offerStr,
          quantity: parseInt(match[1]),
          price: parseInt(match[2]),
        });
      }
    });
    parsedOffers.sort((a, b) => b.quantity - a.quantity); // Highest quantity first

    // 3. Track how many units of each product have been used in offers
    const usedUnits = {};

    // 4. Apply offers from highest quantity to lowest, cascading down
    parsedOffers.forEach((offerObj) => {
      const { raw: offer, quantity: offerQty, price: offerPrice } = offerObj;
      const items = offerGroups[offer];
      if (!items) return;

      // Only use units that haven't been used by a higher offer
      let availableItems = items
        .map(({ product, quantity, itemId }) => {
          const used = usedUnits[itemId] || 0;
          return { product, quantity: quantity - used, itemId };
        })
        .filter(({ quantity }) => quantity > 0);

      let totalQty = availableItems.reduce(
        (sum, { quantity }) => sum + quantity,
        0
      );

      // While we can apply this offer, do so
      while (totalQty >= offerQty) {
        totalAmount += offerPrice;

        // Mark used units for offer
        let unitsToMark = offerQty;
        // Distribute used units for offer across products (prioritize higher price)
        let sortedItems = [...availableItems].sort(
          (a, b) => b.product.price - a.product.price
        );
        for (const { product, quantity, itemId } of sortedItems) {
          if (unitsToMark === 0) break;
          const use = Math.min(quantity, unitsToMark);
          usedUnits[itemId] = (usedUnits[itemId] || 0) + use;
          unitsToMark -= use;
          // Update availableItems for next round
          const item = availableItems.find((i) => i.itemId === itemId);
          if (item) item.quantity -= use;
        }
        // Recalculate totalQty for next possible offer application
        availableItems = availableItems.filter(({ quantity }) => quantity > 0);
        totalQty = availableItems.reduce(
          (sum, { quantity }) => sum + quantity,
          0
        );
      }
      // Any leftovers after all possible offers are applied will be handled by lower offers or normal price
    });

    // 5. Add products without offers or not used in any offer group
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      let quantity = 0;
      for (const size in cartItems[itemId]) {
        quantity += cartItems[itemId][size];
      }
      const used = usedUnits[itemId] || 0;
      const left = quantity - used;
      if (left > 0) {
        totalAmount += product.price * left;
      }
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
      const response = await axios.get(backendUrl + "/api/product/list", {
        withCredentials: true,
      });
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
        {
          withCredentials: true,
        },
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
    getTopHeading();
    getBannerImage();
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
    topHeading,
    bannerImg,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
