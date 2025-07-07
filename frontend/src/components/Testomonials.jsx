import React from "react";
import Title from "./Title";
import TestomonialsCard from "./TestomonialsCard";
import image1 from "../assets/anita.jpeg";
import image2 from "../assets/sumaiya.jpeg";
// import image3 from "../assets/kusumlata.jpeg";
import image4 from "../assets/rishabhjadhav.jpeg";
import image5 from "../assets/testokusm.jpeg";
const TestomonialsContent = [
  {
    image: image1,
    name: "Anita Jadhav",
    desc: "I've never felt more confident in my skin! #XOXO products have transformed my self-care routine. The quality is exceptional, and I love how they celebrate individuality. Each item feels like a little hug for my skin. I can’t recommend them enough!",
  },
  {
    image: image2,
    name: "Sumaiya",
    desc: "#XOXO के प्रोडक्ट्स कमाल के हैं! मैंने जितने भी इस्तेमाल किए, मेरी स्किन पहले से कहीं ज्यादा अच्छी लगने लगी है। बस लगाओ और फील करो, जैसे खुद से प्यार कर रहे हो! सच में, ये सबको ट्राई करना चाहिए!",
  },
  {
    image: image1,
    name: "Pratik Porwal",
    desc: "I’m totally obsessed with #XOXO! Their products have completely changed my skin game. It feels soft, looks radiant, Every time I apply them, it feels like a mini spa moment.",
  },
  {
    image: image4,
    name: "Rishabh Jadhav",
    desc: "I’ve gotta say, #XOXO has changed my routine! I never thought I’d care this much about skincare, but their products are game changer. My skin feels fresh and looks way better. Plus, they’re simple to use, which is a win for me. Definitely a fan!",
  },
  {
    image: image5,
    name: " Kusumlata",
    desc: "Mujhe skincare ke baare me kafi kam pata tha lekin XOXO ke products ke baare me mujhe itne ache se jankari mili ke unko use karna asaan laga or use kar ke kafi ache results mile. Mujhe dark spots the and ab vo kafi kam ho chuke hai....",
  },
];
const Testomonials = () => {
  return (
    <div className=" overflow-hidden flex-col items-center justify-center py-10 md:pt-20 ">
      <Title title={"Client's Testimonials"} />
      <div className="w-full overflow-y-scroll no-scrollbar">
        <div className="flex w-fit ml-4 py-16  gap-4  ">
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
