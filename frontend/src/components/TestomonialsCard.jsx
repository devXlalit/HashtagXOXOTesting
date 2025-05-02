import React from "react";
import { IoIosStar } from "react-icons/io";

const TestomonialsCard = ({ image, name, desc }) => {
  return (
    <div className="w-60 md:min-w-[400px]  h-64 mt-10 md:h-80 px-10 flex flex-col gap-1 md:gap-3 py-4 justify-center items-center bg-[#f9f6df] z-30 ">
      <img
        src={image}
        alt=""
        className="aspect-square w-10 md:w-14 rounded-full"
      />
      <p className="text-sm md:text-xl font-medium text-[#9A3B3B]">{name}</p>
      <span className="flex scale-75 md:scale-100 text-[#9A3B3B] opacity-80">
        <IoIosStar />
        <IoIosStar />
        <IoIosStar />
        <IoIosStar />
        <IoIosStar />
      </span>
      <p className="text-center  md:text-base text-xs opacity-70">{desc}</p>
    </div>
  );
};

export default TestomonialsCard;
