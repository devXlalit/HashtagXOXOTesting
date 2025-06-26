import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  console.log(products);
  return (
    <div className="my-10">
      <div className="text-left py-8 text-5xl">
        <Title title={"Latest Collection"} />
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 gap-y-5 gap-x-2 md:grid-cols-3 px-10 place-items-center lg:grid-cols-5">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
