import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import image1 from "../assets/9.webp";
import { IoIosArrowRoundForward } from "react-icons/io";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  //TODO: Create a function that take category as prop and return the product with the same category
  //TODO: Create a function that take offers as prop and return the product with the same offers

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className=" cursor-pointer"
      to={`/product/${id}`}
    >
      <div className="w-40 md:w-80 hover:scale-105 duration-200 overflow-hidden relative">
        <img
          className=" p-4 transition ease-in-out"
          src={image[0]}
          // src={image1}
          alt=""
        />
        <span className="absolute flex items-center justify-center z-10 hover:scale-105 duration-200 md:bottom-6 right-0 bottom-3 md:right-6 rounded-full ring-1 scale-50 md:scale-100 text-xs text-[#9A3B3B] bg-[#F2ECBE] ring-[#9A3B3B] px-2 shadow-xl py-1">
          Shop Now <IoIosArrowRoundForward size={17} />
        </span>
      </div>
      {/* <p className="pl-5 pt-3 pb-1 text-lg">{name}</p> */}
      <p className="pt-1 opacity-90 text-sm pb-2 md:text-2xl text-center">
        {name}
      </p>

      <p className="text-center text-sm md:text-xl text-[#9A3B3B] font-medium">
        ₹{price}
      </p>
    </Link>
  );
};

export default ProductItem;
