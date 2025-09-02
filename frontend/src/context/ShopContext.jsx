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
  const [offerApplied, setIsofferapplied] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
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

    alert("Product added to cart!!");

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",

          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
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
      toast.error(error.message);
    }
  };

  const getTopHeading = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/heading/list");
      if (response.data.success) {
        setTopHeading(response.data.heading);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getBannerImage = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/get-images?folder=banner"
      );
      if (response.data) {
        setBannerImg(response.data); // <-- set directly
      } else {
        toast.error("No images found");
      }
    } catch (error) {
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
        setIsofferapplied(true);
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

    // 2b. Handle Buy X Get Y offers (e.g., "Buy 1 Get 1", "Buy 2 Get 1")
    const buyXGetYOffers = [];

    Object.keys(offerGroups).forEach((offerStr) => {
      const match = offerStr.match(/^Buy (\d+) Get (\d+)$/i);
      if (match) {
        buyXGetYOffers.push({
          raw: offerStr,
          buy: parseInt(match[1]),
          get: parseInt(match[2]),
        });
      }
    });

    // For each Buy X Get Y offer, apply the logic
    buyXGetYOffers.forEach((offerObj) => {
      const { raw: offer, buy, get } = offerObj;
      const items = offerGroups[offer];
      if (!items) return;

      // Only use units that haven't been used by a higher offer
      let availableItems = items
        .map(({ product, quantity, itemId }) => {
          const used = usedUnits[itemId] || 0;
          return { product, quantity: quantity - used, itemId };
        })
        .filter(({ quantity }) => quantity > 0);

      // Flatten to an array of individual units with price and itemId
      let unitList = [];
      availableItems.forEach(({ product, quantity, itemId }) => {
        for (let i = 0; i < quantity; i++) {
          unitList.push({ product, price: product.price, itemId });
        }
      });

      // Sort by price descending (most expensive first)
      unitList.sort((a, b) => b.price - a.price);

      const groupSize = buy + get;
      let groupCount = Math.floor(unitList.length / groupSize);

      let unitsUsed = 0;
      for (let g = 0; g < groupCount; g++) {
        // For each group, charge for the X most expensive, give Y cheapest free
        const group = unitList.slice(g * groupSize, (g + 1) * groupSize);
        // Charge for the first X (already sorted by price desc)
        for (let i = 0; i < buy; i++) {
          totalAmount += group[i].price;
          usedUnits[group[i].itemId] = (usedUnits[group[i].itemId] || 0) + 1;
        }
        // Mark the free items as used too
        for (let i = buy; i < groupSize; i++) {
          usedUnits[group[i].itemId] = (usedUnits[group[i].itemId] || 0) + 1;
        }
        unitsUsed += groupSize;
      }

      // Remove used units from unitList for leftovers
      unitList = unitList.slice(groupCount * groupSize);

      // Any leftovers (not enough for another group), charge normal price
      unitList.forEach(({ price, itemId }) => {
        totalAmount += price;
        usedUnits[itemId] = (usedUnits[itemId] || 0) + 1;
      });
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
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",

        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
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
      setUsername(localStorage.getItem("username"));
    }
  }, [token]);

  const applyCoupon = (code) => {
    if (offerApplied) {
      toast.error("Only one offer can be applied at a time!");
      return false;
    }
    const foundCoupon = couponCode.find(
      (coupon) => coupon.code.toLowerCase() === code.toLowerCase()
    );
    if (foundCoupon) {
      setAppliedCoupon(foundCoupon.code);
      setAppliedDiscount(foundCoupon.discount);
      toast.success("Coupon applied!");
      return true;
    } else {
      setAppliedCoupon(null);
      setAppliedDiscount(0);
      toast.error("Invalid coupon code");
      return false;
    }
  };

  const getDiscountAmount = () => {
    const subtotal = getCartAmount();
    return (subtotal * appliedDiscount) / 100;
  };

  const getTotalAmount = () => {
    const subtotal = getCartAmount();
    const discount = getDiscountAmount();
    return subtotal - discount;
  };

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
    offerApplied,
    navigate,
    backendUrl,
    setToken,
    token,
    couponCode,
    topHeading,
    bannerImg,
    setUsername,
    username,
    appliedCoupon,
    appliedDiscount,
    applyCoupon,
    getDiscountAmount,
    getTotalAmount,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
