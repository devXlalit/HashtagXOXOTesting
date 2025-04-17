import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="pl-10">
        <LatestCollection />
        <BestSeller />
        {/* <OurPolicy /> */}
        {/* <NewsletterBox/> */}
      </div>
    </>
  );
};

export default Home;
