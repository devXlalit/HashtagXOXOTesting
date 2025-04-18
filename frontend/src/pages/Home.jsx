import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import Feature from "../components/Feature";
import Testomonials from "../components/Testomonials.jsx";
import InstagramSection from "../components/InstagramSection.jsx";
const Home = () => {
  return (
    <>
      <Hero />
      <div className="px-10">
        <LatestCollection />
        <BestSeller />
        {/* <OurPolicy /> */}
        {/* <NewsletterBox/> */}
      </div>
      <Feature />
      <Testomonials />
      <div className="px-10">
        <InstagramSection />
      </div>
    </>
  );
};

export default Home;
