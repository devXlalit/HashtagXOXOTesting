import React from "react";
import { IoIosStar } from "react-icons/io";
import { FaQuoteRight } from "react-icons/fa";

const TestomonialsCard = ({ image, name, desc }) => {
  return (
    <div className="flex w-[500px] text-[#343a40] relative md:justify-between items-center gap-10  rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-6 md:p-8">
      <div className="">
        <FaQuoteRight
          color="#dee2e6"
          className="absolute text-xl md:text-5xl top-3 left-7 md:left-10"
        />
        <p className=" w-[300px]  font-normal text-xs md:text-base pt-6 md:pt-12">
          {desc}
        </p>
        <p className="text-right pt-2 text-xs md:text-base md:pt-0">__{name}</p>
      </div>
      <div>
        <img className="aspect-square rounded-full w-full" src={image} alt="" />
      </div>
    </div>
    // <div className="w-60 md:min-w-[400px]  h-64 mt-10 md:h-80 px-10 flex flex-col gap-1 md:gap-3 py-4 justify-center items-center bg-[#f9f6df] z-30 ">
    //   <img
    //     src={image}
    //     alt=""
    //     className="aspect-square w-10 md:w-14 rounded-full"
    //   />
    //   <p className="text-sm md:text-xl font-medium text-[#9A3B3B]">{name}</p>
    //   <span className="flex scale-75 md:scale-100 text-[#9A3B3B] opacity-80">
    //     <IoIosStar />
    //     <IoIosStar />
    //     <IoIosStar />
    //     <IoIosStar />
    //     <IoIosStar />
    //   </span>
    //   <p className="text-center  md:text-base text-xs opacity-70">{desc}</p>
    // </div>
  );
};

export default TestomonialsCard;
