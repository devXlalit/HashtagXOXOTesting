import { assets } from "../assets/assets";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Hero = () => {
  var settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="z-10">
        <Slider className=" -z-10" {...settings}>
          <img
            className="w-full"
            src="https://picsum.photos/id/1/600/200"
            alt=""
          />
          <img
            className="w-full object-cover"
            src="https://picsum.photos/id/2/600/200"
            alt=""
          />
          <img
            className="w-full object-cover"
            src="https://picsum.photos/id/3/600/200"
            alt=""
          />
          <img
            className="w-full object-cover"
            src="https://picsum.photos/id/4/600/200"
            alt=""
          />
          <img
            className="w-full object-cover"
            src="https://picsum.photos/id/5/600/200"
            alt=""
          />
          <img
            className="w-full object-cover"
            src="https://picsum.photos/id/6/600/200"
            alt=""
          />
        </Slider>
      </div>
    </>
  );
};

export default Hero;
