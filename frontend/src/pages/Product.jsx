import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { fbqTrack } from "../../utils/MetaPixel"; // Importing the fbqTrack function
const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    fbqTrack("ViewContent", {
      content_ids: [productData._id],
      content_name: productData.name,
      content_type: "product",
      value: productData.price,
      currency: "INR",
    });
  }, [productData]);

  const handleAddToCart = () => {
    addToCart(productData._id, size);
    fbqTrack("AddToCart", {
      content_ids: [productData._id],
      contents: [
        { id: productData._id, quantity: size, item_price: productData.price },
      ],
      content_type: "product",
      value: productData.price * size,
      currency: "INR",
    });
  };
  return productData ? (
    <div className="px-5 pt-5 text-[#343a40] transition-opacity ease-in duration-500 opacity-100">
      {/*----------- Product Data-------------- */}
      <div className="flex md:flex-row flex-col  md:px-40 mt-10">
        <div className="flex-1 flex flex-col">
          <div className="px-4">
            <img className="aspect-square md:w-[85%]" src={image} alt="" />
          </div>
          <div className="flex px-0 overflow-x-auto gap-2 w-full mt-2">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[18%] cursor-pointer"
                alt=""
              />
            ))}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-normal text-3xl mt-6 mb-2">{productData.name}</h1>

          <div className=" flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
          </div>
          {/* <p className="text-md font-medium pt-3">Size: 30 ML</p> */}
          <p className=" text-sm md:text-2xl pt-3 text-[#868e96] font-regular">
            Rs.{productData.price}{" "}
          </p>
          <span className="opacity-60 text-sm">Inclusive of all taxes</span>

          <div className="flex my-4  justify-start gap-2 ">
            <Link to="/place-order">
              <button
                onClick={handleAddToCart}
                className="bg-[#ff8787] text-white px-8 py-3 text-sm active:bg-gray-700"
              >
                BUY NOW
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              className="bg-[#ff8787] text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
          </div>
          {/* <p className="mt-5 text-gray-500 text-md leading-5 md:w-4/5">
            {productData.description}
          </p> */}
          <div
            className="mt-5 prose text-gray-500 text-lg leading-6 md:w-4/5" // Tailwind typography for nice formatting
            dangerouslySetInnerHTML={{ __html: productData.description }}
          />
        </div>
      </div>
      <div className="md:px-40 py-10">
        <p className=" text-md md:text-3xl  text-[#ff8787] ring-1 ring-[#ff8787]  p-2">
          Description
        </p>
        <div
          className="prose text-md p-3 text-[#343a40] md:p-6 leading-5 md:text-xl w-full border-[#ff8787]" // Tailwind typography for nice formatting
          dangerouslySetInnerHTML={{ __html: productData.delDescription }}
        />
        <hr />
      </div>

      <RelatedProducts
        category={productData.category}
        currentProductId={productId}
      />
    </div>
  ) : (
    <div className=" opacity-0"></div>
  );
};

export default Product;
