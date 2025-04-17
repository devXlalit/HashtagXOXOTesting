import React from "react";
import bannerImg from "../assets/hashtag.jpg";
import image1 from "../assets/icon-01_modified.png";
import image2 from "../assets/icon-02_modified.png";
import image3 from "../assets/icon-03_modified.png";
import image4 from "../assets/icon-04_modified.png";
import FeatureCard from "./FeatureCard";
const Feature = () => {
  return (
    <div className="relative">
      <img src={bannerImg} alt="testimonial img" className="w-full " />
      <span className="absolute bg-black/40 top-0 w-full h-[62.5vw]"></span>
      <span className="absolute  top-14 md:top-52 text-white font-medium text-shadow-lg text-2xl md:text-5xl w-full text-center">
        BEYOND BEAUTY <br /> WE CRAFT CONFIDENCE
      </span>
      <div className="flex flex-wrap -translate-y-20 md:-translate-y-52  gap-5 md:gap-3 justify-center">
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
      </div>
    </div>
  );
};

export default Feature;
