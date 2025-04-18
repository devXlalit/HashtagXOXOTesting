import React from "react";
import { IoIosStar } from "react-icons/io";

const TestomonialsCard = ({ image, name, desc }) => {
  return (
    <div className="min-w-[400px]  h-64 mt-10 md:h-80 px-10 flex flex-col gap-3 py-4 justify-center items-center bg-[#f9f6df] z-30 ">
      <img src={image} alt="" className="w-5 md:w-14 rounded-full" />
      <p className="text-xl font-medium text-[#9A3B3B]">{name}</p>
      <span className="flex text-[#9A3B3B] opacity-80">
        <IoIosStar />
        <IoIosStar />
        <IoIosStar />
        <IoIosStar />
        <IoIosStar />
      </span>
      <p className="text-center opacity-70">{desc}</p>
    </div>
  );
};

export default TestomonialsCard;
