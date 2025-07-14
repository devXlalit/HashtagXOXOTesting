import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [delDescription, setDelDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [offers, setOffers] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [newproduct, setNewProduct] = useState(false);

  const availableOffers = [
    "Buy 1 at 299",
    "Buy 2 at 299",
    "Buy 3 at 399",
    "Buy 5 at 599",
  ];

  const handleOfferChange = (offer) => {
    setOffers((prev) =>
      prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      formData.append("newproduct", newproduct);
      formData.append("delDescription", delDescription);
      formData.append("offers", JSON.stringify(offers));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setDelDescription("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  console.log(delDescription);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <ReactQuill
          onChange={setDescription}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Brief Description</p>
        <ReactQuill
          onChange={setDelDescription}
          value={delDescription}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          theme="snow"
          placeholder="Write detailed product description here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="">Select Category</option>
            <option value="Serum">Serum</option>
            <option value="Facewash">Facewash</option>
            <option value="Face pack">Face pack</option>
            <option value="Scrub">Scrub</option>
            <option value="Sunscreen">Sunscreen</option>
            <option value="Moisturizer">Moisturizer</option>
            <option value="Hair Oil">Hair Oil</option>
            <option value="shampoo">shampoo</option>
            <option value="soaps">soaps</option>
            <option value="fragrances">fragrances</option>
            <option value="toner">Toner</option>
            <option value="lip balm">Lip Balm</option>
            <option value="body mist">Body Mist</option>
            <option value="undereye cream">Undereye Cream</option>
            <option value="wipes">Wipes</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Offer's</p>
          {availableOffers.map((offer) => (
            <label key={offer} className="block">
              <input
                type="checkbox"
                value={offer}
                checked={offers.includes(offer)}
                onChange={() => handleOfferChange(offer)}
              />
              <span className="ml-2">{offer}</span>
            </label>
          ))}
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setNewProduct((prev) => !prev)}
          checked={newproduct}
          type="checkbox"
          id="newproduct"
        />
        <label className="cursor-pointer" htmlFor="newproduct">
          Add to new products
        </label>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-[#212529] text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
