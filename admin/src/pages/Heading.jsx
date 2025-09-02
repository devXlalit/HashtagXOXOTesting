import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
const Heading = ({ token }) => {
  const [heading, setHeading] = React.useState("");
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/heading/list");
      if (response.data.success) {
        setHeading(response.data.heading[0].heading);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const removeHeading = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/heading/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("topheading", heading);

      const response = await axios.post(
        backendUrl + "/api/heading/add",
        { heading },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setHeading("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-5">
      <h1>Add the top heading</h1>
      <input
        onChange={(e) => setHeading(e.target.value)}
        value={heading}
        className="w-full max-w-[500px] px-3 py-2"
        type="text"
        required
        placeholder="Enter the top heading"
      />
      <button type="submit" className="w-28 py-3 mt-4 bg-[#212529] text-white">
        ADD
      </button>
    </form>
  );
};

export default Heading;
