import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src="https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className=" text-gray-500">
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className=" text-gray-500">
            Tel: (415) 555-0132 <br /> Email: admin@schuh.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Schuh
          </p>
          <p className=" text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* <NewsletterBox/> */}
    </div>
  );
};

export default Contact;
