import React from "react";
import { FaInstagram } from "react-icons/fa";

const Underconstruction = () => {
  return (
    <div className=" h-screen">
      <img
        src="/work-in-progress.png"
        alt=""
        className="w-40 mx-auto my-0 pt-60 animate-pulse "
      />
      <h1 className="text-center mt-5 md:text-2xl font-semibold text-gray-700">
        Hey! Thanks for reaching us, currently we are under construction, <br />{" "}
        but you can still buy our products
      </h1>
      <a
        href="https://www.instagram.com/hash_tagxoxo/"
        target="_blank"
        className="flex justify-center items-center gap-5 mt-5 text-2xl md:text-5xl font-semibold text-gray-700"
      >
        Contact us -
        <FaInstagram className="hover:text-pink-400 duration-200 cursor-pointer" />
      </a>
    </div>
  );
};

export default Underconstruction;
