import React from "react";

const FeatureCard = ({ image, title, desc }) => {
  return (
    <div className="h-64 md:h-80 px-10 flex flex-col gap-3 py-4 justify-center items-center  bg-[#f9f6df] w-60 md:w-1/5  z-30 -bottom-20">
      <img src={image} alt="" className="w-5 md:w-14" />
      <p className="text-center font-medium opacity-80 text-xl">{title}</p>
      <p className="text-center opacity-70">{desc}</p>
    </div>
  );
};

export default FeatureCard;
