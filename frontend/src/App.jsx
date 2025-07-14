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
import Topbar from "./components/topbar";
import SkinQuiz from "./pages/SkinQuiz";
import Underconstruction from "./pages/Underconstruction";
import TermsNConditions from "./pages/TermsNConditions";
const App = () => {
  const [testing, settesting] = React.useState(false);
  return (
    <>
      {testing ? (
        <Underconstruction />
      ) : (
        <>
          <Topbar />
          <Navbar />
          <div className=" ">
            <ToastContainer />
            <SearchBar />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Redirect /collection to /collection/all */}
              <Route
                path="/collection/:productcategory"
                element={<Collection />}
              />
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
              <Route path="/skinquiz" element={<SkinQuiz />} />
              <Route path="/TermsNConditions" element={<TermsNConditions />} />
            </Routes>
            <div className="px-10  bg-[#F5FAEE] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg">
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
