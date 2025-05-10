import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { LuShoppingBag } from "react-icons/lu";
import HashTagXOXO from "../assets/Hashatag_XOXO_logo_v2-remove-1_2_upscaled.png";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [whatnew, setWhatnew] = useState(false);
  const [offer, setOffer] = useState(false);
  const [category, setCategory] = useState(false);
  const [visible, setVisible] = useState(false);
  const { products } = useContext(ShopContext);
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
  const uniqueOffers = [...new Set(products.map((item) => item.offers))];
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
      className=" flex ring-1 z-50 bg-[#efdbb9] text-black ring-zinc-200 shadow-md px-10  items-center justify-between py-3 md:py-1 font-medium"
    >
      <Link to="/">
        <img src={HashTagXOXO} alt="logo" className="h-12" />
      </Link>
      <ul className="hidden md:flex leading-8 z-50 font-normal  md:flex-wrap md:static md:bg-transparent bg-[#efdbb9] md:shadow-none shadow-xl py-6 md:py-4 top-16 left-0 right-0 absolute   md:flex-row flex-col justify-center items-center md:gap-5 ">
        <li
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
        </li>
        <li
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
        </li>
        <li
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
        </li>
        <NavLink
          to="/contact"
          className="flex justify-center flex-col items-center gap-1"
        >
          <p>Contact</p>
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
          <CgProfile
            className="cursor-pointer opacity-90"
            size={25}
            onClick={() => (token ? null : navigate("/login"))}
          />

          {/* Dropdown Menu */}
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
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
          <Link to="/place-order" className="relative">
            {/* <img src={assets.cart_icon} className="w-5 min-w-5" alt="" /> */}
            <LuShoppingBag size={25} className="opacity-90" />
            <p
              id="cartcount"
              className=" absolute right-[-5px]  bottom-[-5px] w-4 text-center leading-4 bg-white text-slate-800 aspect-square rounded-full text-[8px]"
            >
              {getCartCount()}
            </p>
          </Link>
        </span>
      </ul>
      {visible && (
        <ul className=" leading-8 z-50 font-normal md:flex md:flex-wrap md:static md:bg-transparent bg-[#efdbb9] md:shadow-none shadow-xl py-6 md:py-4 top-16 left-0 right-0 absolute   md:flex-row flex-col justify-center items-center block md:gap-5 ">
          <li
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
                      <NavLink to={`/product/${item._id}`} key={index}>
                        <li className="">
                          <span className="opacity-80 hover:underline hover:opacity-75 duration-200">
                            {item.name.split(" ").slice(0, 4).join(" ")}
                          </span>
                          <span className="text-xs no-underline font-light pl-2  text-[#9A3B3B]">
                            New
                          </span>
                        </li>
                      </NavLink>
                    )
                )}
              </ul>
            )}
          </li>
          <li
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
          </li>
          <li
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
          </li>
          <NavLink
            to="/contact"
            className="flex justify-center flex-col items-center gap-1"
          >
            <p>Contact</p>
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
            <CgProfile
              className="cursor-pointer opacity-90"
              size={25}
              onClick={() => (token ? null : navigate("/login"))}
            />

            {/* Dropdown Menu */}
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
              {/* <img src={assets.cart_icon} className="w-5 min-w-5" alt="" /> */}
              <LuShoppingBag size={25} className="opacity-90" />
              <p
                id="cartcount"
                className=" absolute right-[-5px]  bottom-[-5px] w-4 text-center leading-4 bg-white text-slate-800 aspect-square rounded-full text-[8px]"
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
        className=" md:hidden absolute top-6 right-10"
      />

      {/* <div
        className={`absolute z-40 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex z-40 flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex z-40 items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
