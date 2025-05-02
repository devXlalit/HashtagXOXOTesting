import React from "react";
import Title from "./Title";
import TestomonialsCard from "./TestomonialsCard";
import image1 from "../assets/cropped_image.png";
import image2 from "../assets/WhatsApp-Image-2021-03-31-at-6.13.56-PM.jpeg";
import image3 from "../assets/vineet.jpg";
const TestomonialsContent = [
  {
    image: image2,
    name: "Pushpa",
    desc: "#XOXO products are amazing! Whatever I have used, my skin looks better than ever. Just put it on and feel like you're loving yourself! Seriously, everyone should try this!",
  },
  {
    image: image3,
    name: "Vineet",
    desc: "I’ve gotta say, #XOXO has changed my routine! I never thought I’d care this much about skincare, but their products are a game changer. My skin feels fresh and looks way better. Plus, they’re simple to use, which is a win for me. Definitely a fan!",
  },
  {
    image: image1,
    name: "Sarita",
    desc: "I've never felt more confident in my skin! #XOXO products have transformed my self-care routine. The quality is exceptional, and I love how they celebrate individuality. Each item feels like a little hug for my skin. I can’t recommend them enough!",
  },
];
const Testomonials = () => {
  return (
    <div className="w-full">
      <Title title={"CLIENT'S TESTIMONIALS"} />
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 px-4 py-6 w-max md:w-full flex-nowrap">
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
