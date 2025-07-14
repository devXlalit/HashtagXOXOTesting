import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import image1 from "../assets/9.webp";
import { IoIosArrowRoundForward } from "react-icons/io";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className=" z-0 cursor-pointer  flex flex-col items-center justify-center"
      to={`/product/${id}`}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-40  md:w-60 duration-300 overflow-hidden relative"
      >
        {!isHovered ? (
          <img
            className=" p-4 duration-300    ease-in-out transition-all"
            src={image[0]}
            // src={image1}
            alt=""
          />
        ) : (
          <img
            className=" p-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)] duration-300 ease-in-out transition-all"
            src={image[1]}
            // src={image1}
            alt=""
          />
        )}
        {/* <span className="absolute flex items-center justify-center z-10 hover:scale-105 duration-200 md:bottom-6 right-0 bottom-3 md:right-6 rounded-full ring-1 scale-50 md:scale-100 text-xs text-[#9A3B3B] bg-[#F2ECBE] ring-[#9A3B3B] px-2 shadow-xl py-1">
          Shop Now <IoIosArrowRoundForward size={17} />
        </span> */}
        {/* <span className="absolute top-4 left-4 bg-[#ff8787] text-white font-semibold text-xs rounded-xl px-3 py-2">-60%</span> */}
      </div>
      {/* <p className="pl-5 pt-3 pb-1 text-lg">{name}</p> */}
      <p className=" text-sm md:text-lg px-4 text-[#343a40] text-center">
        {name}
      </p>

      <p className="text-center text-sm md:text-lg py-2 text-[#868e96] font-regular">
        Rs.{price}{" "}
        <span className="line-through text-[#868e96] text-sm font-light">
          Rs.{Math.floor(price * 2)}
        </span>
      </p>
      <p className="bg-[#ff8787] w-30 justify-center text-white font-semibold md:text-sm text-xs rounded-lg px-3 py-2">
        Order Now
      </p>
    </Link>
  );
};

export default ProductItem;
