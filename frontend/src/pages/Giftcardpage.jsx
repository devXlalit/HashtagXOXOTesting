import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Giftcardpage = () => {
  const { addToCart } = useContext(ShopContext);
  const { id } = useParams();
  const giftCard = [
    {
      id: 1,
      image:
        "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
      name: "Gift Card",
      description: "Gift Card for your loved ones",
      price: 500,
      category: "Gift Card",
    },
    {
      id: 2,
      image:
        "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
      name: "Gift Card",
      description: "Gift Card for your loved ones",
      price: 1000,
      category: "Gift Card",
    },
    {
      id: 3,
      image:
        "https://marketplace.canva.com/EAFDjw6INg8/2/0/800w/canva-beige-modern-floral-watercolor-gift-voucher-W51Cx9tpUxM.jpg",
      name: "Gift Card",
      description: "Gift Card for your loved ones",
      price: 1500,
      category: "Gift Card",
    },
  ];

  // Find the gift card by id
  const giftCardData = giftCard.find((card) => card.id === Number(id));

  if (!giftCardData) {
    return <div>Gift Card not found</div>;
  }

  return (
    <div className="px-5 pt-5 text-[#343a40] transition-opacity ease-in duration-500 opacity-100">
      <div className="flex md:flex-row flex-col  md:px-40 mt-10">
        <div className="flex-1 flex flex-col">
          <div className="px-4">
            <img
              className="aspect-square md:w-[85%]"
              src={giftCardData.image}
              alt=""
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-normal text-3xl mt-6 mb-2">
            {giftCardData.name}
          </h1>
          <p className=" text-sm md:text-2xl pt-3 text-[#868e96] font-regular">
            Rs.{giftCardData.price}{" "}
            <span className="line-through text-[#868e96] text-xl font-light">
              Rs.{Math.floor(giftCardData.price * 2)}
            </span>
          </p>
          <span className="opacity-60 text-sm">Inclusive of all taxes</span>
          <div>
            <button
              onClick={() => {
                addToCart(id, giftCardData.price);
              }}
              className="bg-[#ff8787] mt-5 text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
          </div>
          <div
            className="mt-5 prose text-gray-500 text-lg leading-6 md:w-4/5"
            dangerouslySetInnerHTML={{ __html: giftCardData.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default Giftcardpage;
