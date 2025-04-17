import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <hr className="mt-10" />
      <div className="text-sm flex pt-10 pb-10  justify-between">
        <div>
          {/* <img src={assets.logo} className="mb-5 w-32" alt="" /> */}
          <span className="text-2xl font-semibold">Schuh</span>
          <p className="w-5/6  md:w-1/3 text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link className="hover:underline" to="/">
              Home
            </Link>
            <Link className="hover:underline" to="/about">
              About us
            </Link>
            <Link to="/" className="hover:underline">
              Delivery
            </Link>
            <Link to="/" className="hover:underline">
              Privacy policy
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
