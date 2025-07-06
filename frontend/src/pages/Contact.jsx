import React from "react";
import Title from "../components/Title";
import { useForm, ValidationError } from "@formspree/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  const [state, handleSubmit] = useForm("xzzgwldn");
  if (state.succeeded) {
    toast.success("Thanks for your enquiry! We will get back to you soon.");
  }
  return (
    <div className="p-10">
      <ToastContainer />

      <Title title={" Enquiry Form"} />
      <form onSubmit={handleSubmit} className="grid pt-5 md:gap-4 md:p-10">
        {/* Dropdown for User Type */}

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="block col-span-2 md:col-span-1 p-2 border mb-4 "
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="block col-span-2 md:col-span-1  p-2 border mb-4 "
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          className="block col-span-2 md:col-span-1  p-2 border mb-4 "
        />

        <input
          name="city"
          type="text"
          placeholder="City"
          className="block col-span-2 md:col-span-1 p-2 border mb-4 "
        />
        <input
          name="state"
          type="text"
          placeholder="State"
          className="block col-span-2 md:col-span-1  p-2 border mb-4 "
        />
        <input
          name="zipcode"
          type="text"
          placeholder="Zipcode"
          className="block col-span-2 md:col-span-1  p-2 border mb-4 "
        />
        <select
          name="user_type"
          className="block w-full col-span-2 md:col-span-1  p-2 border mb-4 outline-none "
        >
          <option className="" value="retailer">
            Retailer
          </option>
          <option value="distributor">Distributor</option>
          <option value="individual">Individual</option>
        </select>
        <input
          name="country"
          type="text"
          placeholder="Country"
          className="block col-span-2 md:col-span-1 p-2 border mb-4 "
        />
        <textarea
          name="message"
          placeholder="Message"
          rows="4"
          className="block outline-none col-span-2 p-2 border mb-4 "
        ></textarea>

        <button
          type="submit"
          disabled={state.submitting}
          className="bg-[#F04077] col-span-2 text-white grid-row-2 px-4 py-2 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
