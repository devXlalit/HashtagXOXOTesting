import React from "react";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
const SideBar = () => {
  const { products } = useContext(ShopContext);
  const uniqueCategories = [...new Set(products.map((item) => item.category))];
  const uniqueOffers = [...new Set(products.map((item) => item.offers))];
  return (
    <div className="flex-1 hidden md:block  mt-20">
      <span className="text-xl pt-10">
        <h1 className="text-xl pt-10 pl-10 pb-2 font-medium text-[#9A3B3B]">
          PRODUCT CATEGORIES
        </h1>
      </span>
      {/* <ul
        onMouseLeave={() => {
          setWhatnew(false);
        }}
        className=" leading-8 pl-10 "
      >
        {products.map(
          (item, index) =>
            item.newproduct && (
              <Link to={`/product/${item._id}`} key={index}>
                <li className="">
                  <span className=" hover:underline hover:opacity-75 duration-200">
                    {item.name.split(" ").slice(0, 4).join(" ")}
                  </span>
                  <span className="text-xs no-underline font-light pl-2  text-[#9A3B3B]">
                    New
                  </span>
                </li>
              </Link>
            )
        )}
      </ul> */}
      <ul
        onMouseLeave={() => {
          setOffer(false);
        }}
        className="pl-10 leading-8"
      >
        {uniqueOffers.map((item, index) => (
          <Link to={`/collection/${item}`} key={index}>
            <li className="">
              <span className=" hover:underline hover:opacity-75 duration-200">
                {item}
              </span>
            </li>
          </Link>
        ))}
      </ul>
      <ul
        onMouseLeave={() => {
          setCategory(false);
        }}
        className="leading-8 pl-10"
      >
        {uniqueCategories.map((item, index) => (
          <Link to={`/collection/${item}`} key={index}>
            <li className="">
              <span className="hover:underline hover:opacity-75 duration-200">
                {item}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
