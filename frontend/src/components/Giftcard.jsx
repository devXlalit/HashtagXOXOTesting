import React from "react";
import { Link } from "react-router-dom";
const Giftcard = ({ id, image, name, desc, price }) => {
  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className=" z-0 cursor-pointer flex flex-col items-center justify-center"
      to={`/giftcard/${id}`}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-40  md:w-60 duration-300 overflow-hidden relative"
      >
        <img
          className=" p-4 duration-300 ease-in-out transition-all"
          src={image}
          // src={image1}
          alt=""
        />
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
      <p className="bg-[#DF4C84] w-30 justify-center text-white font-semibold md:text-sm text-xs rounded-lg px-3 py-2">
        Order Now
      </p>
    </Link>
  );
};

export default Giftcard;
