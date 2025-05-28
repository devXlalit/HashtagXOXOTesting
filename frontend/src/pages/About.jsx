import React from "react";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="px-10">
      <div className="text-2xl py-10 border-t">
        <Title title={"About Us"} />
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        <div className="w-80 md:w-1/3 p-5 ring-1 ring-[#DF4C84] shadow-[5px_5px_0px_0px_rgba(223,76,132)]">
          <p className="text-4xl">Vision</p>
          <p className="pt-4 text-left w-full">
            We envision a world where skincare is inclusive, intentional, and
            empowering — free from harmful standards and full of love. Hashtag
            XOXO aspires to lead the self-care revolution with products that are
            as kind to the skin as they are to the planet, promoting beauty that
            begins with healing, honesty, and holistic well-being — one gentle
            glow at a time!
          </p>
        </div>
        <div className="w-80 md:w-1/3 p-5 ring-1 ring-[#DF4C84] shadow-[5px_5px_0px_0px_rgba(223,76,132)]">
          <p className="text-4xl">Mission</p>
          <p className="pt-4 text-left w-full">
            At Hashtag XOXO, we’re redefining beauty with every drop. Rooted in
            Ayurvedic wisdom and powered by modern science, we create
            gender-neutral, cruelty-free, and toxin-free skincare that
            celebrates healthy skin, not fair skin. Our mission is to nurture a
            culture of self- care, self-love, and radical self-acceptance, where
            every routine is a ritual and every face is a canvas of confidence —
            no filters required!
          </p>
        </div>
      </div>
      <div className="py-20">
        <Title title={"Contact Us"} />
        <div className="flex py-10 justify-center ">
          <div className="flex w-full md:w-2/5 md:text-xl shadow-[5px_5px_0px_0px_rgba(223,76,132)] ring-[#DF4C84]   ring-1 outline-none flex-col">
            <input
              type="text"
              placeholder="Enter your name"
              className="p-4 ring-1  ring-[#DF4C84] outline-none"
            />
            <input
              type="text"
              placeholder="Enter your email"
              className="p-4 ring-1 ring-[#DF4C84] outline-none"
            />
            <textarea
              name=""
              id=""
              placeholder="Write your message for us"
              className="p-4 ring-1  ring-[#DF4C84] outline-none"
              rows={10}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
