import React, { useEffect } from "react";
import Title from "./Title";
import instalogo from "../assets/Hashatag_XOXO_logo_v2-remove-1_2_upscaled.png";

const InstagramSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const videoLinks = [
    "https://www.instagram.com/reel/DH2UQ4XzcW0/?igsh=MXhic3MwZ2Z1cHk2Mg==",
    "https://www.instagram.com/reel/DH1pMtPzbX7/?igsh=YWJteGUweGJldWg1",
    "https://www.instagram.com/reel/DHSRHYRTbNL/?igsh=OGQ2MGY4eGlqamZt",
    "https://www.instagram.com/reel/DHYYeUoTr3q/?igsh=aGtlZmxjM3dkbjQw",
    "https://www.instagram.com/reel/DHXauF8z6JH/?igsh=MWI1dG5vc3cybzJvZg==",
    "https://www.instagram.com/reel/DHQqIURTC3m/?igsh=MW5scmlzYjJxaW1jOQ==",
  ];

  return (
    <div className="mt-20 px-10">
      <Title title={"FOLLOW US ON INSTAGRAM"} />

      {/* Instagram profile display */}
      <div className="flex mt-10 gap-3 items-center mb-6">
        <img
          src={instalogo}
          alt="instalogo"
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="text-2xl font-medium leading-6">@hash_tagxoxo</p>
          <p className="text-sm pl-1 text-[#C08261] font-medium opacity-80">
            Beauty, cosmetic & personal care
          </p>
        </div>
      </div>

      {/* Instagram video posts */}
      <div className="grid grid-cols-3 gap-5 justify-center px-10  items-center">
        {videoLinks.map((link, index) => (
          <div
            key={index}
            className="w-full max-w-sm aspect-square overflow-hidden rounded-xl shadow-lg"
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={link}
              data-instgrm-version="14"
              style={{
                width: "100%",
                height: "100%",
                border: "0",
                margin: "0 auto",
              }}
            ></blockquote>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramSection;
