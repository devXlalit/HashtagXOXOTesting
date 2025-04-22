import React from "react";

const Contact = () => {
  return (
    <div className="p-10">
      <h1 className="md:text-3xl text-[#9A3B3B] text-center font-medium">
        SELL YOUR PRODUCTS WITH US
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 p-10">
        {/* Dropdown for User Type */}

        <input
          type="text"
          placeholder="Name"
          className="block  p-2 border mb-4 "
        />
        <input
          type="email"
          placeholder="Email"
          className="block  p-2 border mb-4 "
        />
        <input
          type="text"
          placeholder="Phone"
          className="block  p-2 border mb-4 "
        />

        <input
          type="text"
          placeholder="City"
          className="block p-2 border mb-4 "
        />
        <input
          type="text"
          placeholder="State"
          className="block  p-2 border mb-4 "
        />
        <input
          type="text"
          placeholder="Zipcode"
          className="block  p-2 border mb-4 "
        />
        <select className="block w-full  p-2 border mb-4 outline-none ">
          <option className="" value="retailer">
            Retailer
          </option>
          <option value="distributor">Distributor</option>
          <option value="individual">Individual</option>
        </select>
        <input
          type="text"
          placeholder="Country"
          className="block  p-2 border mb-4 "
        />
        <textarea
          placeholder="Message"
          rows="4"
          className="block col-span-2 p-2 border mb-4 "
        ></textarea>

        <button className="bg-[#9A3B3B] col-span-2 text-white grid-row-2 px-4 py-2 ">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Contact;
