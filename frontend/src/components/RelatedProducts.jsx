import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // Filter products with same category, but EXCLUDE the current product
      productsCopy = productsCopy.filter(
        (item) => item.category === category && item._id !== currentProductId
      );
      setRelated(productsCopy.slice(0, 5)); // Take only 5 products
    }
  }, [products, category, currentProductId]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-8">
        <Title title={"Related Products"} />
      </div>

      <div className="grid grid-cols-2 gap-y-5 gap-x-2 md:grid-cols-3 md:px-10 place-items-center lg:grid-cols-5">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
