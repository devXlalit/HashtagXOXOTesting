import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import HashTagXOXO from "../assets/Hashatag_XOXO_logo_v2-remove-1_2_upscaled.png";
import { IoMenu } from "react-icons/io5";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Navbar = () => {
  const [whatnew, setWhatnew] = useState(false);
  const [offer, setOffer] = useState(false);
  const [category, setCategory] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { products, username } = useContext(ShopContext);

  const location = useLocation();

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const uniqueCategories = [...new Set(products.map((item) => item.category))];
  let allOffers = [];

  products.forEach((product) => {
    product.offers.forEach((offerStr) => {
      try {
        const parsed = JSON.parse(offerStr); // Convert stringified array to real array
        allOffers.push(...parsed); // Merge all offers
      } catch (e) {
        console.error("Invalid JSON in offers:", offerStr);
      }
    });
  });

  // Step 2: Get only unique offers
  const uniqueOffers = [...new Set(allOffers)];

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  // console.dir(products);
  useEffect(() => {
    setVisible(false);
    setWhatnew(false);
    setOffer(false);
    setCategory(false);
  }, [location]);

  return (
    <div
      id="bag"
      className=" flex z-50 bg-[#F5FAEE] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  text-[#343a40]  px-10  items-center justify-between py-3 md:py-1 font-medium"
    >
      <Link to="/">
        <img src={HashTagXOXO} alt="logo" className=" w-12 z-50 md:w-24" />
      </Link>
      <ul className="hidden md:flex leading-8 z-50 font-normal capitalize text-lg  md:flex-wrap md:static md:bg-transparent bg-[#F04077] md:shadow-none shadow-xl py-6 md:py-4 top-16 left-0 right-0 absolute   md:flex-row flex-col justify-center items-center md:gap-5 ">
        {/* {uniqueOffers.map((item, index) => (
          <Link to={`/collection/${item}`} key={index}>
            <li className="">
              <span className="hover:text-[#ff8787]  hover:opacity-100 duration-200">
                {item}
              </span>
            </li>
          </Link>
        ))} */}
        {uniqueCategories.map((item, index) => (
          <Link to={`/collection/${item}`} key={index}>
            <li className="">
              <span className="hover:text-[#ff8787]  hover:opacity-100 duration-200">
                {item || (
                  <Skeleton
                    baseColor="#adb5bd"
                    highlightColor="#f8f9fa"
                    className="opacity-40"
                    enableAnimation={true}
                    width={20}
                    count={1}
                  />
                )}
              </span>
            </li>
          </Link>
        ))}

        {/* /*{" "} */}
        {/* <li
          onMouseEnter={() => {
            setWhatnew(true);
          }}
          onClick={() => {
            setWhatnew((prev) => !prev);
          }}
          to="#"
          className="flex  justify-center items-center gap-1 relative"
        >
          <p>What's New</p>
          <IoIosArrowDown />

          {whatnew && (
            <ul
              onMouseLeave={() => {
                setWhatnew(false);
              }}
              className="absolute   leading-7 top-12 left-0 z-50 px-auto w-72 pl-6 py-6 bg-zinc-100 shadow-lg"
            >
              {products.map(
                (item, index) =>
                  item.newproduct && (
                    <Link to={`/product/${item._id}`} key={index}>
                      <li className="">
                        <span className="opacity-80 hover:underline hover:opacity-75 duration-200">
                          {item.name.split(" ").slice(0, 4).join(" ")}
                        </span>
                        <span className="text-xs no-underline font-light pl-2  text-[#9A3B3B]">
                          New
                        </span>
                      </li>
                    </Link>
                  )
              )}
            </ul>
          )}
        </li>{" "} */}
        {/* <li
          onMouseEnter={() => {
            setOffer(true);
          }}
          onClick={() => {
            setOffer((prev) => !prev);
          }}
          to="#"
          className="flex justify-center items-center gap-1 relative"
        >
          <p>Offer's</p>
          <IoIosArrowDown />
          {offer && (
            <ul
              onMouseLeave={() => {
                setOffer(false);
              }}
              className=" absolute leading-7 top-12 z-50 px-auto w-60 pl-6 py-6 bg-zinc-100 shadow-lg"
            >
              {uniqueOffers.map((item, index) => (
                <Link to={`/collection/${item}`} key={index}>
                  <li className="">
                    <span className="opacity-80 hover:underline hover:opacity-75 duration-200">
                      {item}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </li> */}
        {/* <li
          onMouseEnter={() => {
            setCategory(true);
          }}
          onClick={() => {
            setCategory((prev) => !prev);
          }}
          to="#"
          className="flex justify-center items-center gap-1 relative"
        >
          <p>Category</p>
          <IoIosArrowDown />
          {category && (
            <ul
              onMouseLeave={() => {
                setCategory(false);
              }}
              className="absolute leading-7 top-12 z-50 px-auto w-60 pl-6 py-6 bg-zinc-100 shadow-lg"
            >
              {uniqueCategories.map((item, index) => (
                <Link to={`/collection/${item}`} key={index}>
                  <li className="">
                    <span className="opacity-80 hover:underline hover:opacity-75 duration-200">
                      {item}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </li> */}
        <NavLink
          to="/About"
          className="flex hover:text-[#F04077]  hover:opacity-100 duration-200 justify-center flex-col items-center gap-1"
        >
          <p>About</p>
        </NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
        <span className="flex gap-2 md:gap-4 md:flex-row flex-col items-center">
          <FiSearch
            title="search"
            className="md:ml-6  cursor-pointer"
            size={25}
            onClick={() => {
              setShowSearch(true);
              navigate(`/collection/all`);
            }}
          />
          <span className="flex gap-1 items-center cursor-pointer">
            <CgProfile
              title="login"
              className="cursor-pointer opacity-90"
              onMouseEnter={() => {
                setDropDown(true);
              }}
              size={25}
              onClick={() => (token ? null : navigate("/login"))}
            />
            <p className="text-md ">
              {token
                ? localStorage.getItem("username")?.split(" ")[0]
                : "Guest"}
            </p>
          </span>
          {/* Dropdown Menu */}
          {token && dropDown && (
            <div
              onMouseLeave={() => {
                setDropDown(false);
              }}
              className="group-hover:block z-40 absolute bg-[#F5FAEE]  shadow-xl dropdown-menu right-20 top-20 pt-4"
            >
              <div className="flex flex-col gap-2 w-36 py-3 px-5   rounded">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-[#ff8787] duration-200"
                >
                  Orders
                </p>

                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-[#ff8787] duration-200"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
          <Link to="/place-order" className="relative">
            {/* <img src={assets.cart_icon} className="w-5 min-w-5" alt="" /> */}
            <BiShoppingBag size={25} className="opacity-90" />
            <p
              id="cartcount"
              className=" absolute right-[-5px]  bottom-[-5px] w-4 text-center leading-4 bg-[#ff8787] text-white aspect-square rounded-full text-[8px]"
            >
              {getCartCount()}
            </p>
          </Link>
        </span>
      </ul>
      {visible && (
        <ul className="capitalize leading-8 z-50 font-normal text-center md:hidden md:flex-wrap md:static md:bg-transparent bg-[#F5FAEE] md:shadow-none shadow-xl py-6 md:py-4 top-[90px] left-0 right-0 absolute   md:flex-row flex-col justify-center items-center block md:gap-5 ">
          {/* {uniqueOffers.map((item, index) => (
            <Link to={`/collection/${item}`} key={index}>
              <li className="">
                <span className="hover:text-[#F04077]  hover:opacity-100 duration-200">
                  {item}
                </span>
              </li>
            </Link>
          ))} */}
          {uniqueCategories.map((item, index) => (
            <Link to={`/collection/${item}`} key={index}>
              <li className="">
                <span className="hover:text-[#F04077]  hover:opacity-100 duration-200">
                  {item}
                </span>
              </li>
            </Link>
          ))}
          <NavLink
            to="/About"
            className="flex justify-center flex-col items-center gap-1"
          >
            <p>About</p>
          </NavLink>
          <span className="flex gap-2 md:gap-4 md:flex-row flex-col items-center">
            <FiSearch
              className="md:ml-6 opacity-90 cursor-pointer"
              size={25}
              onClick={() => {
                setShowSearch(true);
                navigate(`/collection/all`);
              }}
            />
            <span className="flex gap-1 items-center cursor-pointer">
              <CgProfile
                className="cursor-pointer opacity-90"
                size={25}
                onClick={() => (token ? null : navigate("/login"))}
              />
              {token
                ? localStorage.getItem("username")?.split(" ")[0]
                : "Guest"}
              {/* Dropdown Menu */}
            </span>
            {token && (
              <div className="group-hover:block z-40 hidden absolute dropdown-menu right-0 pt-4">
                <div className="flex flex-col gap-2 w-36 py-3 px-5  bg-slate-100 text-gray-500 rounded">
                  <p className="cursor-pointer hover:text-black">My Profile</p>

                  <p
                    onClick={() => navigate("/orders")}
                    className="cursor-pointer hover:text-black"
                  >
                    Orders
                  </p>

                  <p
                    onClick={logout}
                    className="cursor-pointer hover:text-black"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
            <Link to="/place-order" className="relative">
              <BiShoppingBag size={25} className="opacity-90" />
              <p
                id="cartcount"
                className=" absolute right-[-5px] shadow-xl  bottom-[-5px] w-4 text-center leading-4 bg-[#ff8787] aspect-square rounded-full text-[8px]"
              >
                {getCartCount()}
              </p>
            </Link>
          </span>
        </ul>
      )}

      <IoMenu
        onClick={() => {
          setVisible((prev) => !prev);
        }}
        size={25}
        className=" md:hidden absolute top-15 right-10"
      />
    </div>
  );
};

export default Navbar;
