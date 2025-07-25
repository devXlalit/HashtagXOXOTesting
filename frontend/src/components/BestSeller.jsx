import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <>
      {bestSeller.length > 0 && (
        <div className="my-10">
          <div className="text-left text-3xl py-8">
            <Title title={"Best Sellers"} />
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-2 md:grid-cols-3 px-10 place-items-center lg:grid-cols-5">
            {bestSeller.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BestSeller;
