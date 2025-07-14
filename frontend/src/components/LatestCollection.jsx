import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  useEffect(() => {
    setLatestProducts(products.slice(0, 9));
  }, [products]);
  return (
    <div className="my-10 ">
      <div className="text-left py-8 text-5xl">
        <Title title={"Our Products"} />
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-2 md:grid-cols-3 px-10 place-items-center lg:grid-cols-3">
        <>
          {viewAll
            ? products.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))
            : latestProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))}
        </>
      </div>
      <p
        onClick={() => {
          setViewAll((prev) => !prev);
        }}
        className="ml-24 mt-14 font-medium text-xl hover:text-[#ff8787] px-3 py-1 text-white rounded-md hover:bg-transparent ring-1 ring-[#ff8787] bg-[#ff8787] w-fit duration-300 cursor-pointer"
      >
        View {!viewAll ? "more" : "less"}..
      </p>
    </div>
  );
};

export default LatestCollection;
