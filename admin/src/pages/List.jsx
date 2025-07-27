import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { assets } from "../assets/assets";
const List = ({ token }) => {
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState([]);
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
  const [editingId, setEditingId] = useState(null);
  const availableOffers = [
    "Buy 1 at 299",
    "Buy 2 at 299",
    "Buy 3 at 399",
    "Buy 5 at 599",
    "Buy 2 Get 1",
    "Buy 1 Get 1",
  ];

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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

      let response;
      if (editingId) {
        formData.append("productId", editingId);
        response = await axios.post(
          backendUrl + "/api/product/edit",
          formData,
          { headers: { token } }
        );
      } else {
        response = await axios.post(backendUrl + "/api/product/add", formData, {
          headers: { token },
        });
      }

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
        setEditingId(null); // Reset editing state
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const EditProduct = (id) => {
    setEdit(true);
    const product = list.find((item) => item._id === id);
    if (product) {
      setEditingId(product._id); // Track which product is being edited
      setName(product.name);
      setDescription(product.description);
      setDelDescription(product.delDescription);
      setPrice(product.price);
      setCategory(product.category);
      setOffers(
        Array.isArray(product.offers)
          ? product.offers
          : JSON.parse(product.offers)
      );
      setBestseller(product.bestseller);
      setNewProduct(product.newproduct);
      setImage1(product.image[0]);
      setImage2(product.image[1]);
      setImage3(product.image[2]);
      setImage4(product.image[3]);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
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
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleOfferChange = (offer) => {
    setOffers((prev) =>
      prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer]
    );
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* ------- List Table Title ---------- */}

        {/* ------ Product List ------ */}
        {edit && (
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full items-start gap-3"
          >
            <div>
              <p className="mb-2">Edit Image</p>

              <div className="flex gap-2">
                <label htmlFor="image1">
                  <img
                    className="w-20"
                    src={
                      !image1
                        ? assets.upload_area
                        : typeof image1 === "string"
                        ? image1
                        : URL.createObjectURL(image1)
                    }
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
                    src={
                      !image2
                        ? assets.upload_area
                        : typeof image2 === "string"
                        ? image2
                        : URL.createObjectURL(image2)
                    }
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
                    src={
                      !image3
                        ? assets.upload_area
                        : typeof image3 === "string"
                        ? image3
                        : URL.createObjectURL(image3)
                    }
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
                    src={
                      !image4
                        ? assets.upload_area
                        : typeof image4 === "string"
                        ? image4
                        : URL.createObjectURL(image4)
                    }
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
            <button
              type="submit"
              className="w-28 py-3 mt-4 bg-[#212529] text-white"
            >
              Replace
            </button>
          </form>
        )}

        <p className="mb-2 mt-10">All Products List</p>

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Edit</b>
          <b className="text-center">Remove products</b>
        </div>
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p
              onClick={() => EditProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg text-[#4dabf7]"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg text-[#fa5252]"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
