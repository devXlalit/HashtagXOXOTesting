import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import image1 from "../assets/9.webp";
const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className=" cursor-pointer"
      to={`/product/${id}`}
    >
      <div className="w-80 overflow-hidden">
        <img
          className="hover:scale-110 p-4 transition ease-in-out"
          // src={image[0]}
          src={image1}
          alt=""
        />
      </div>
      {/* <p className="pl-5 pt-3 pb-1 text-lg">{name}</p> */}
      <p className="pt-1 opacity-90 pb-2 text-2xl text-center">
        Forest Wonder Face Pack
      </p>

      <p className="text-center text-xl text-[#9A3B3B] font-medium">₹{price}</p>
    </Link>
  );
};

export default ProductItem;
