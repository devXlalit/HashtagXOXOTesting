import React from "react";
import Title from "../components/Title";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const About = () => {
  return (
    <div className="px-10 text-[#212529]">
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
          src="/ideas-progress-vision-inspiration-design-concept.jpg"
          alt=""
          className="w-full md:w-1/2 md:mt-14 shadow-sm"
          loading="lazy"
        />
      </div>
      <div className="flex pt-20 justify-center md:flex-nowrap flex-wrap  gap-10">
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
      </div>
      <div className="md:px-14">
        <div className="text-2xl py-10 md:py-40 ">
          <Title title={"Our Founders"} />
        </div>
        <div className="flex flex-col md:flex-row md:gap-10 items-center justify-center">
          <div className="md:w-1/3">
            <h1 className="text-4xl font-bold">
              Meet The Team <br /> Our Professionals
            </h1>
            <hr className="w-40  my-6" />
            <p className="bg-zinc-100 py-14 px-4 md:mb-0 mb-10 -ml-3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
              similique architecto ad sit. Quis animi voluptatem obcaecati
              itaque debitis quibusdam ab voluptates iure?
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src="/richa.jpeg" alt="" className="rounded-full w-28" />
            <p className="text-xl font-medium mt-4">Richa Malviya</p>
            <p className="text-sm text-center">Founder</p>
            <span className="flex gap-2 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  size={20}
                  className="hover:text-blue-500 duration-200"
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 duration-200"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 duration-200"
              >
                <FaLinkedinIn size={22} />
              </a>
            </span>
          </div>
          <div className="flex flex-col bg-zinc-100 px-12 py-14 md:mt-0 mt-10 items-center justify-center">
            <img src="/vineet.jpeg" alt="" className="rounded-full w-28" />
            <p className="text-xl font-medium mt-4">Vineet Sharma</p>
            <p className="text-sm text-center">Founder</p>
            <span className="flex gap-2 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF
                  size={20}
                  className="hover:text-blue-500 duration-200"
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 duration-200"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://www.facebook.com"
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
  );
};

export default About;
