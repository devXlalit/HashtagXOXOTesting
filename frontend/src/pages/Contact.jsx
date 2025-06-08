import React from "react";
import Title from "../components/Title";
const Contact = () => {
  return (
    <div className="p-10">
      <Title title={" Enquiry Form"} />
      <div className="grid pt-5 md:gap-4 md:p-10">
        {/* Dropdown for User Type */}

        <input
          type="text"
          placeholder="Name"
          className="block col-span-2 md:col-span-1 p-2 border mb-4 "
        />
        <input
          type="email"
          placeholder="Email"
          className="block col-span-2 md:col-span-1  p-2 border mb-4 "
        />
        <input
          type="text"
          placeholder="Phone"
          className="block col-span-2 md:col-span-1  p-2 border mb-4 "
        />

        <input
          type="text"
          placeholder="City"
          className="block col-span-2 md:col-span-1 p-2 border mb-4 "
        />
        <input
          type="text"
          placeholder="State"
          className="block col-span-2 md:col-span-1  p-2 border mb-4 "
        />
        <input
          type="text"
          placeholder="Zipcode"
          className="block col-span-2 md:col-span-1  p-2 border mb-4 "
        />
        <select className="block w-full col-span-2 md:col-span-1  p-2 border mb-4 outline-none ">
          <option className="" value="retailer">
            Retailer
          </option>
          <option value="distributor">Distributor</option>
          <option value="individual">Individual</option>
        </select>
        <input
          type="text"
          placeholder="Country"
          className="block col-span-2 md:col-span-1 p-2 border mb-4 "
        />
        <textarea
          placeholder="Message"
          rows="4"
          className="block outline-none col-span-2 p-2 border mb-4 "
        ></textarea>

        <button className="bg-[#F04077] col-span-2 text-white grid-row-2 px-4 py-2 ">
          Submit
        </button>
      </div>
      {/* <div className="py-20">
        <Title title={"Contact Us"} />
        <div className="flex py-10 justify-center ">
          <div className="flex w-full md:w-2/5 md:text-xl shadow-[5px_5px_0px_0px_rgba(223,76,132)] ring-[#DF4C84]   ring-1 outline-none flex-col">
            <input
              type="text"
              placeholder="Enter your name"
              className="p-4 ring-1  ring-[#DF4C84] outline-none"
            />
            <input
              type="text"
              placeholder="Enter your email"
              className="p-4 ring-1 ring-[#DF4C84] outline-none"
            />
            <textarea
              name=""
              id=""
              placeholder="Write your message for us"
              className="p-4 ring-1  ring-[#DF4C84] outline-none"
              rows={10}
            ></textarea>
            <button className="bg-[#F04077] col-span-2 text-white grid-row-2 px-4 py-2 ">
              Submit
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Contact;
