import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";

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
      productsCopy = productsCopy.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (productcategory && productcategory.toLowerCase() !== "all") {
      let decodedParam = decodeURIComponent(productcategory)
        .toLowerCase()
        .trim();

      decodedParam = decodedParam.replace(/[-\/]+$/, "").trim();

      // Filter by offer if the decodedParam matches any offer string
      productsCopy = productsCopy.filter((item) => {
        if (!item.offers || item.offers.length === 0) return false;

        try {
          // Parse each stringified offers array
          return item.offers.some((offerString) => {
            const parsedOffers = JSON.parse(offerString); // turns string into array
            return parsedOffers.some(
              (offer) => offer.toLowerCase().trim() === decodedParam
            );
          });
        } catch (e) {
          console.error("Offer parsing failed for item:", item, e);
          return false;
        }
      });

      // If no match is found in offers, try category fallback
      if (productsCopy.length === 0) {
        productsCopy = products.filter(
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

  return (
    <>
      <div className="flex w-full">
        <SideBar />
        <div className="w-full">
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

              <div className="flex  justify-end items-center ">
                <div className="grid  grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center justify-center gap-y-14 gap-x-8 xl:gap-x-20 px-2 items-center place-content-center md:px-10">
                  {filterProducts.map((item) => (
                    <ProductItem
                      key={item._id}
                      name={item.name}
                      id={item._id}
                      price={item.price}
                      image={item.image}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
