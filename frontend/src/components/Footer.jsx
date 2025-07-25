import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Hashatag_XOXO_logo_v2-remove-1_2_upscaled.png";
const Footer = () => {
  return (
    <div className="pt-14 mt-40 ">
      {/* <hr className="mt-10" /> */}
      <div className="text-sm flex md:flex-nowrap flex-wrap gap-10 md:gap-0 pb-10  ">
        <div>
          <img src={logo} className="mb-5 w-20 md:w-32" alt="" />
          {/* <span className="text-2xl font-semibold"></span> */}
          <p className="md:w-1/3 opactity-80 ">
            At #XOXO self-love meets self-care. Our brand is built on the idea
            that every moment you spend on yourself is a moment worth
            cherishing. We believe in embracing your individuality and
            celebrating what makes you unique.
          </p>
        </div>

        <div className="md:w-1/4 ">
          <p className="md:text-xl font-medium mb-5">QUICK LINKS</p>
          <ul className="flex flex-col w-full gap-1 ">
            <Link className="hover:text-[#ff8787]" to="/termsnconditions">
              Terms & conditions
            </Link>
            <Link to="/About" className="hover:text-[#ff8787]">
              About us
            </Link>
          </ul>
        </div>
        <div className="md:w-1/4">
          <p className="md:text-xl font-medium mb-5">CONTACT US</p>
          <ul className="flex  md:text-sm text-xs flex-col gap-1 ">
            <Link to="tel:+91 78286 86093" className="hover:text-[#ff8787]">
              +91 78286 86093
            </Link>
            <Link
              to="mailto:Hello@hashtagxoxo.com"
              className="hover:text-[#ff8787]"
            >
              Hello@hashtagxoxo.com
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
