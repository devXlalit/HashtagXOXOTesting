import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {
  const { bannerImg } = useContext(ShopContext);

  var settings = {
    dots: true,
    infinite: bannerImg.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      <div className="z-10">
        {bannerImg.length > 0 && (
          <Link to="/skinquiz">
            <Slider className="-z-10" {...settings}>
              {bannerImg.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.public_id}
                  className="w-full z-30 object-fit"
                />
              ))}
            </Slider>
          </Link>
        )}
      </div>
    </>
  );
};

export default Hero;
