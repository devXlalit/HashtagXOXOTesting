import React from "react";

const FeatureCard = ({ image, title, desc }) => {
  return (
    <div className="w-52 md:h-80 flex flex-col gap-3 py-4 justify-center items-center px-7 md:px-10  bg-[#f9f6df] lg:w-fit z-30 -bottom-20">
      <img src={image} alt="" className="w-8 lg:w-14" />
      <p className="text-center font-medium opacity-80 md:text-xl">{title}</p>
      <p className="text-center opacity-70">{desc}</p>
    </div>
  );
};

export default FeatureCard;
