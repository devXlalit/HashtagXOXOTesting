import React from "react";

import FeatureCard from "./FeatureCard";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import Title from "./Title";
import { Link } from "react-router-dom";

const Feature = () => {
  return (
    <div className="relative py-10">
      <Title title={"Why Choose Us"} />
      <marquee loop="infinite" direction="left" bahavior="scroll" className="">
        <span className="flex py-20 items-center gap-20 justify-center">
          <img src="/Artboard 1 copy 2@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy 3@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy 4@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy 2@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy 3@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy 4@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy 2@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy 3@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy 4@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1 copy@3x.png" alt="" className="w-32" />
          <img src="/Artboard 1@3x.png" alt="" className="w-32" />
        </span>
      </marquee>
      {/* <img src={bannerImg} alt="testimonial img" className="w-full " /> */}
      {/* <span className="absolute bg-black/40 top-0 w-full h-[62.5vw]"></span>
      <span className="absolute  top-14 md:top-52 text-white font-medium text-shadow-lg text-2xl md:text-5xl w-full text-center">
        BEYOND BEAUTY <br /> WE CRAFT CONFIDENCE
      </span> */}
      {/* <div className="-translate-y-20 md:-translate-y-52  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-10 place-items-center">
        <FeatureCard
          image={image1}
          title="Proudly Made in India"
          desc="Proudly crafted in India, each product tells a story of heritage and innovation"
        />
        <FeatureCard
          image={image2}
          title="Ayurvedic Inspired"
          desc="Revitalize your body and soul with the timeless secrets of Ayurveda - Harness the wisdom of nature!"
        />
        <FeatureCard
          image={image3}
          title="Korean Beauty Ingredients"
          desc="Experience the transformative power of K-beauty; where cutting-edge science meets luxurious self-care!"
        />
        <FeatureCard
          image={image4}
          title="Unisex Range"
          desc="Versatile, inclusive, and designed for all—embrace self-care that knows no gender!  "
        />
      </div> */}
      <div className="relative">
        <img
          src="/beautiful-composition-spa-bath-concept-with-copyspace.jpg"
          alt=""
          className="w-full h-[30vw] object-cover"
        />
        <span className="absolute top-6 right-7 md:top-40 md:right-64 ">
          <h1 className="text-sm md:text-4xl leading-tight md:leading-9 font-medium opacity-80">
            Know about your skin start <br /> a skin quiz now!
          </h1>
          <Link to="/skinquiz" onClick={() => scrollTo(0, 0)}>
            <button className="py-1 scale-50 -ml-6 md:ml-0 md:scale-100 px-4 mt-1 md:mt-6 shadow-md hover:ring-1 ring-black hover:bg-transparent hover:text-black transition-all duration-200 bg-[#DF4C84] rounded-md text-white">
              Take Quiz
            </button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Feature;
