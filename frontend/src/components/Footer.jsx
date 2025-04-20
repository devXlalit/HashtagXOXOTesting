import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Hashatag_XOXO_logo_v2-remove-1_2_upscaled.png";
const Footer = () => {
  return (
    <div>
      {/* <hr className="mt-10" /> */}
      <div className="text-sm flex   pt-14 pb-10  ">
        <div>
          <img src={logo} className="mb-5 w-32" alt="" />
          {/* <span className="text-2xl font-semibold"></span> */}
          <p className="w-5/6  md:w-1/3 opactity-80 ">
            At #XOXO self-love meets self-care. Our brand is built on the idea
            that every moment you spend on yourself is a moment worth
            cherishing. We believe in embracing your individuality and
            celebrating what makes you unique.
          </p>
        </div>

        <div className="w-1/4 ">
          <p className="text-xl font-medium mb-5">QUICK LINKS</p>
          <ul className="flex flex-col gap-1 ">
            <Link className="hover:underline" to="/about">
              Terms & conditions
            </Link>
            <Link to="/" className="hover:underline">
              Privacy policy
            </Link>
            <Link to="/" className="hover:underline">
              About us
            </Link>
          </ul>
        </div>
        <div className="w-1/4">
          <p className="text-xl font-medium mb-5">CONTACT US</p>
          <ul className="flex flex-col gap-1 ">
            <Link to="/" className="hover:underline">
              +91 78286 86093
            </Link>
            <Link to="/" className="hover:underline">
              Hello@hashtagxoxo.com
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
