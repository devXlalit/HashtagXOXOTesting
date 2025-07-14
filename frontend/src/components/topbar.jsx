import React, { useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Topbar = () => {
  const { topHeading } = React.useContext(ShopContext);

  return (
    <div className="bg-[#ff8787] text-xs md:text-sm text-opacity-90 shadow-xl text-center py-1 font-semibold text-white top-0 w-full">
      {topHeading[0]?.heading}
    </div>
  );
};

export default Topbar;
