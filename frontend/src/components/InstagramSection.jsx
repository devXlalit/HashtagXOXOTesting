import Title from "./Title";

const InstagramSection = () => {
  return (
    <div className=" px-0 md:px-10">
      <Title title={"Follow Us On Instagram"} />
      <div className="justify-center items-center md:pt-20 flex">
        <iframe
          src="//lightwidget.com/widgets/d3ac2e60d7ec51d99e0444b6b5b364a1.html"
          allowTransparency="true"
          className="lightwidget-widget w-full md:w-[80%]"
          style={{ border: 1, overflow: "hidden" }}
        ></iframe>
      </div>
    </div>
  );
};

export default InstagramSection;
