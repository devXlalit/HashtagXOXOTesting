import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext"; 
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import Giftcard from "../components/Giftcard";

const Collection = () => {
  const { productcategory } = useParams();
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const applyFilter = () => {
    let productsCopy = products.slice();

    // Search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Route param filter: handle both category and offers
    if (productcategory && productcategory.toLowerCase() !== "all") {
      let decodedParam = decodeURIComponent(productcategory)
        .toLowerCase()
        .trim();

      // Clean trailing slash or hyphen from route
      decodedParam = decodedParam.replace(/[-\/]+$/, "").trim();

      const isOffer = products.some(
        (item) => item.offers?.toLowerCase().trim() === decodedParam
      );

      if (isOffer) {
        productsCopy = productsCopy.filter(
          (item) => item.offers?.toLowerCase().trim() === decodedParam
        );
      } else {
        productsCopy = productsCopy.filter(
          (item) => item.category?.toLowerCase().trim() === decodedParam
        );
      }
    }

    // Additional category filters
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = [...filterProducts];

    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        fpCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }

    setFilterProducts(fpCopy);
  };

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productcategory, products, search, showSearch, category, subCategory]);

  useEffect(() => {
    sortProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  const giftCard = [
    {
      id: 1,
      image:
        "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
      name: "Gift Card",
      description: "Gift Card for your loved ones",
      price: 500,
      category: "Gift Card",
    },
    {
      id: 2,
      image:
        "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
      name: "Gift Card",
      description: "Gift Card for your loved ones",
      price: 1000,
      category: "Gift Card",
    },
    {
      id: 3,
      image:
        "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
      name: "Gift Card",
      description: "Gift Card for your loved ones",
      price: 1500,
      category: "Gift Card",
    },
  ];
  return (
    <>
      <div className="flex w-full">
        <SideBar />
        <div className="">
          <div className="flex  flex-col sm:flex-row gap-1 sm:gap-10 pr-6 pt-10 border-t">
            <div className="">
              <div className="flex justify-between text-base sm:text-2xl mb-4">
                {/* <Title title={"Collection"} /> */}
                <span></span>
                {/* <h1 className="text-2xl pl-10 font-medium text-[#9A3B3B]">
                  COLLECTIONS
                </h1> */}
                <select
                  onChange={(e) => setSortType(e.target.value)}
                  className="border-2 p-2 justify-between border-gray-300 text-sm px-2"
                >
                  <option value="relavent">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Low to High</option>
                  <option value="high-low">Sort by: High to Low</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-y-5 gap-x-2 md:grid-cols-3 px-10 place-items-center lg:grid-cols-5">
                {filterProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                ))}

                {productcategory.includes("giftcard") &&
                  giftCard.map((item, index) => (
                    <Giftcard
                      id={item.id}
                      image={item.image}
                      name={item.name}
                      desc={item.desc}
                      price={item.price}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
