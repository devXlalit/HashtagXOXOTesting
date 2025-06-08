import React from "react";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="px-10">
      <div className="text-2xl py-5 md:py-20 border-t">
        <Title title={"About Us"} />
      </div>
      <div className="flex  justify-center md:flex-nowrap flex-wrap gap-10">
        <div className="w-80 md:w-2/5 h-1/2 p-6 ring-4 text-[#343a40] ring-[#343a40] ">
          <p className="text-4xl font-medium">Vision</p>
          <p className="text-xl font-medium pl-1">What we do</p>
          <p className="pt-4 text-left w-full font-medium">
            We envision a world where skincare is inclusive, intentional, and
            empowering — free from harmful standards and full of love. <br />
            <br />
            Hashtag XOXO aspires to lead the self-care revolution with products{" "}
            <br />
            <br />
            that are as kind to the skin as they are to the planet, promoting
            beauty that begins with healing, honesty, and holistic well-being —
            one gentle glow at a time!
          </p>
        </div>
        <img
          src="../../public/ideas-progress-vision-inspiration-design-concept.jpg"
          alt=""
          className="w-full md:w-1/2 md:mt-14 shadow-sm"
          loading="lazy"
        />
      </div>
      <div className="flex pt-20 justify-center md:flex-nowrap flex-wrap  gap-10">
        <img
          src="../../public/10139.jpg"
          alt=""
          className="w-full md:w-1/2 md:mt-14 shadow-sm"
          loading="lazy"
        />
        <div className="w-80 md:w-2/5 h-1/2 p-6 ring-4 text-[#343a40] ring-[#343a40] ">
          <p className="text-4xl font-medium">Mision</p>
          <p className="text-xl font-medium pl-1">What we do</p>
          <p className="pt-4 text-left w-full font-medium">
            We envision a world where skincare is inclusive, intentional, and
            empowering — free from harmful standards and full of love. <br />
            <br />
            Hashtag XOXO aspires to lead the self-care revolution with products{" "}
            <br />
            <br />
            that are as kind to the skin as they are to the planet, promoting
            beauty that begins with healing, honesty, and holistic well-being —
            one gentle glow at a time!
          </p>
        </div>
      </div>
      <div className="md:px-14">
        <div className="text-2xl py-10 md:py-20 ">
          <Title title={"Our Founders"} />
        </div>
        <div>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-10">
            <div className="w-80 md:w-2/5 h-1/2 p-6 ring-4 text-[#343a40] ring-[#343a40] ">
              <p className="text-4xl font-medium">Meet Richa</p>
              <p className="text-xl font-medium pl-1">
                Founder & Social media manager
              </p>
              <p className="pt-4 text-left w-full font-medium">
                We envision a world where skincare is inclusive, intentional,
                and empowering — free from harmful standards and full of love.{" "}
                <br />
                <br />
                Hashtag XOXO aspires to lead the self-care revolution with
                products <br />
                <br />
                that are as kind to the skin as they are to the planet,
                promoting beauty that begins with healing, honesty, and holistic
                well-being — one gentle glow at a time!
              </p>
            </div>
            <img
              src="/WhatsApp Image 2025-06-04 at 7.00.35 PM.jpeg"
              alt=""
              className=" md:w-1/4 "
            />
          </div>

          <div className="flex  flex-wrap md:flex-nowrap pt-10 justify-center gap-10">
            <img
              src="/WhatsApp Image 2025-06-04 at 7.01.05 PM.jpeg"
              alt=""
              className="md:w-1/4 md:-mt-44"
            />
            <div className="w-80 md:w-2/5 h-1/2 p-6 ring-4 text-[#343a40] ring-[#343a40] ">
              <p className="text-4xl font-medium">Meet Vineet</p>
              <p className="text-xl font-medium pl-1">
                Founder & Product manager
              </p>
              <p className="pt-4 text-left w-full font-medium">
                We envision a world where skincare is inclusive, intentional,
                and empowering — free from harmful standards and full of love.{" "}
                <br />
                <br />
                Hashtag XOXO aspires to lead the self-care revolution with
                products <br />
                <br />
                that are as kind to the skin as they are to the planet,
                promoting beauty that begins with healing, honesty, and holistic
                well-being — one gentle glow at a time!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
