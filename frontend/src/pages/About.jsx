import React from "react";
import Title from "../components/Title";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const About = () => {
  return (
    <div className=" text-[#212529]">
      <img src="/web banner About Us-02.png" alt="" className="w-full" />
      <img src="/web banner About Us-03.png" alt="" className="w-full" />
      {/* <div className="flex  justify-center md:flex-nowrap flex-wrap gap-10">
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
          src="/ideas-progress-vision-inspiration-design-concept.jpg"
          alt=""
          className="w-full md:w-1/2 md:mt-14 shadow-sm"
          loading="lazy"
        />
      </div> */}
      {/* <div className="flex pt-20 justify-center md:flex-nowrap flex-wrap  gap-10">
        <img
          src="/10139.jpg"
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
      </div> */}
      <div className="px-10 md:px-14">
        <div className="text-2xl md:block hidden py-10 md:py-40 ">
          <Title title={"The Founders"} />
        </div>
        <div className="flex flex-col md:flex-row md:gap-10 items-center justify-center">
          <div className="w-full md:w-3/5 text-center md:text-left">
            <h1 className="md:text-4xl mt-10 text-left text-2xl font-bold">
              Meet Our Founders
            </h1>
            <hr className="w-full  my-6" />
            <p className="bg-zinc-100 md:py-12 p-8 md:text-left md:text-base md:px-8 md:mb-0 mb-10 -ml-3">
              We didn’t just start a brand—we started a movement. Hashtag XOXO
              is our heartfelt journey to bring you skincare that heals, hugs,
              and honors your natural beauty. Rooted in ancient Indian wisdom
              and powered by plant-based purity, every product is a promise of
              self-love. Because we believe true beauty begins with being
              kind—to your skin, your soul, and the earth. Hashtag XOXO
              celebrates Indian beauty—bold, radiant, rooted, and
              unapologetically authentic. We’re here to remind the world that
              everything your skin needs has always grown right here, on Indian
              soil.
            </p>
            {/* <a
              href="/Hashtag XOXO Catalogue 2025.pdf"
              download
              className="bg-[#ff8787] px-4 py-2 rounded-md text-white ring-1 ring-[#ff8787] font-semibold hover:text-[#ff8787] hover:bg-transparent duration-200"
            >
              Download Brochure
            </a> */}
          </div>
          <div className="flex">
            <div className="flex flex-col px-12 py-12 md:py-20 bg-[#ff8787] items-center justify-center">
              <img src="/richa.jpeg" alt="" className="rounded-full w-28" />
              <p className="text-xl font-medium mt-4">Richa Malviya</p>
              <p className="text-sm text-center">Founder</p>
              <span className="flex gap-2 mt-4">
                <a
                  href="https://www.instagram.com/hash_tagxoxo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 duration-200"
                >
                  <FaInstagram size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/richa-malviya-977151103/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 duration-200"
                >
                  <FaLinkedinIn size={22} />
                </a>
              </span>
            </div>
            <div className="flex flex-col bg-zinc-200 px-12 py-12 md:py-20 md:mt-0 mt-10 items-center justify-center">
              <img src="/vineet.jpeg" alt="" className="rounded-full w-28" />
              <p className="text-xl font-medium mt-4">Vineet Sharma</p>
              <p className="text-sm text-center">Founder</p>
              <span className="flex gap-2 mt-4">
                <a
                  href="https://www.instagram.com/hash_tagxoxo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 duration-200"
                >
                  <FaInstagram size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/vineet-sharma-1128b155/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 duration-200"
                >
                  <FaLinkedinIn size={22} />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
