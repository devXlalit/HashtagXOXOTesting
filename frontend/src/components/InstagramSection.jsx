import React, { useEffect } from "react";
import Title from "./Title";
import instalogo from "../assets/Hashatag_XOXO_logo_v2-remove-1_2_upscaled.png";

const InstagramSection = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Reload Instagram embed script when component updates
    return () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
  }, []);

  const instagramPosts = [
    {
      id: 1,
      imageUrl:
        "https://hashtagxoxo.com/wp-content/uploads/sb-instagram-feed-images/496624113_1408344010352551_917697545453723158_n.heicfull.jpg", // Use the post's image URL
      postLink: "https://www.instagram.com/p/DJbD6zFxDS9/",
      username: "hash_tagxoxo",
      profilePic: instalogo,
    },
    {
      id: 2,
      imageUrl:
        "https://hashtagxoxo.com/wp-content/uploads/sb-instagram-feed-images/496624113_1408344010352551_917697545453723158_n.heicfull.jpg", // Use the post's image URL
      postLink: "https://www.instagram.com/p/DJbD6zFxDS9/",
      username: "hash_tagxoxo",
      profilePic: instalogo,
    },
    {
      id: 3,
      imageUrl:
        "https://hashtagxoxo.com/wp-content/uploads/sb-instagram-feed-images/496624113_1408344010352551_917697545453723158_n.heicfull.jpg", // Use the post's image URL
      postLink: "https://www.instagram.com/p/DJbD6zFxDS9/",
      username: "hash_tagxoxo",
      profilePic: instalogo,
    },
    {
      id: 4,
      imageUrl:
        "https://hashtagxoxo.com/wp-content/uploads/sb-instagram-feed-images/496624113_1408344010352551_917697545453723158_n.heicfull.jpg", // Use the post's image URL
      postLink: "https://www.instagram.com/p/DJbD6zFxDS9/",
      username: "hash_tagxoxo",
      profilePic: instalogo,
    },

    // Add more posts as needed
  ];

  return (
    <div className="my-20 md:px-10">
      <Title title={"Follow Us On Instagram"} />

      {/* Instagram profile display */}
      <div className="flex mt-10 gap-3 items-center mb-6">
        <img
          src={instalogo}
          alt="instalogo"
          className="h-10 w-10 md:w-14 md:h-14 rounded-full"
        />
        <div>
          <p className="md:text-2xl font-medium leading-6">@hash_tagxoxo</p>
          <p className="text-xs md:text-sm pl-1 text-[#DF4C84] font-medium opacity-80">
            Beauty, cosmetic & personal care
          </p>
        </div>
      </div>

      {/* Instagram posts grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href={post.postLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 h-72 flex flex-col">
              {/* Header */}
              <div className="flex items-center p-3 border-b">
                <img
                  src={post.profilePic}
                  alt={post.username}
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="font-semibold">{post.username}</span>
              </div>
              {/* Image */}
              <div className="flex-1 flex items-center justify-center bg-gray-100">
                <img
                  src={post.imageUrl}
                  alt="Instagram post"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Add custom CSS to hide Instagram controller */}
      <style jsx>{`
        .instagram-media {
          margin: 0 !important;
        }
        .instagram-media iframe {
          margin: 0 !important;
        }
        /* Hide Instagram controller */
        .instagram-media iframe {
          height: 450px !important;
        }
        .instagram-media iframe::before {
          display: none !important;
        }
        .instagram-media iframe::after {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default InstagramSection;
