import { assets } from "../assets/assets";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="z-10">
        <Slider className=" -z-10" {...settings}>
          <img className="w-full" src="/web.webp" alt="" />
          <img className="w-full object-cover" src="/web.webp" alt="" />
          <img className="w-full object-cover" src="/web.webp" alt="" />
          <img className="w-full object-cover" src="/web.webp" alt="" />
          <img className="w-full object-cover" src="/web.webp" alt="" />
          <img className="w-full object-cover" src="/web.webp" alt="" />
        </Slider>
      </div>
    </>
  );
};

export default Hero;
