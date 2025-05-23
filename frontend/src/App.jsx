import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import PaymentForm from "./pages/PaymentForm";
const App = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <ToastContainer />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Redirect /collection to /collection/all */}
          <Route path="/collection/:productcategory" element={<Collection />} />
          <Route
            path="/collection"
            element={<Navigate to="/collection/all" />}
          />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/payment" element={<PaymentForm />} />
        </Routes>
        <div className="px-10 bg-opacity-60 bg-[#E2C799] shadow-lg ring-1 ring-gray-900/5 rounded-lg">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
