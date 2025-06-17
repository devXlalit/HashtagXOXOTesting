import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Hero = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get(`${backendUrl}/api/get-images?folder=banner`)
      .then((res) => {
        const uniqueUrls = [...new Set(res.data.map((img) => img.url))]; // just in case
        setImages(res.data);
      })
      .catch((err) => console.error("Failed to load images", err));
  }, []);
  var settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  return (
    <>
      <div className="z-10">
        {images.length > 0 && (
          <Link to="/skinquiz">
            <Slider className="-z-10" {...settings}>
              {images.map((img) => (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.public_id}
                  className="w-full object-fit"
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
