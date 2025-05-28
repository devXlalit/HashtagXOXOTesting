import React from "react";
import Title from "./Title";
import TestomonialsCard from "./TestomonialsCard";
import image1 from "../assets/cropped_image.png";
import image2 from "../assets/WhatsApp-Image-2021-03-31-at-6.13.56-PM.jpeg";
import image3 from "../assets/vineet.jpg";
const TestomonialsContent = [
  {
    image: image1,
    name: "Pushpa",
    desc: "#XOXO products are amazing! Whatever I have used, my skin looks better than ever. Just put it on and feel like you're loving yourself! Seriously, everyone should try this!",
  },
  {
    image: image1,
    name: "Vineet",
    desc: "#XOXO products are amazing! Whatever I have used, my skin looks better than ever. Just put it on and feel like you're loving yourself! Seriously, everyone should try this!",
  },
  {
    image: image1,
    name: "Sarita",
    desc: "#XOXO products are amazing! Whatever I have used, my skin looks better than ever. Just put it on and feel like you're loving yourself! Seriously, everyone should try this!",
  },
];
const Testomonials = () => {
  return (
    <div className="">
      <Title title={"Client's Testimonials"} />
      <div className="">
        <div className="flex md:flex-nowrap flex-wrap gap-5 px-4 md:py-20 py-10 w-full overflow-x-auto scrollbar-hide">
          {TestomonialsContent.map((item, idx) => (
            <TestomonialsCard
              key={idx}
              image={item.image}
              name={item.name}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testomonials;
