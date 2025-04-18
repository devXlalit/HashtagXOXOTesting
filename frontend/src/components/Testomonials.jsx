import React from "react";
import Title from "./Title";
import TestomonialsCard from "./TestomonialsCard";
import image1 from "../assets/cropped_image.png";

const Testomonials = () => {
  return (
    <div className="w-full">
      <Title title={"CLIENT'S TESTIMONIALS"} />
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-5 px-4 py-6 w-max md:w-full flex-nowrap">
          {[...Array(5)].map((_, idx) => (
            <TestomonialsCard
              key={idx}
              image={image1}
              name={"Sarita"}
              desc={
                "I've never felt more confident in my skin! #XOXO products have transformed my self-care routine. The quality is exceptional, and I love how they celebrate individuality. Each item feels like a little hug for my skin. I can’t recommend them enough!"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testomonials;
