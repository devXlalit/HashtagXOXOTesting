import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          phone,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          backendUrl + "/api/user/login",

          {
            email,
            password,
          }
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col my-10 items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="font-regular text-[#ff8787] text-3xl">{currentState}</p>
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 outline-none py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="tel"
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          value={phone}
          maxLength={10}
          className="w-full px-3 outline-none py-2 border border-gray-800"
          placeholder="Phone"
          required
        />
      )}

      <span className="relative w-full px-3 py-2 border border-gray-800 flex justify-between items-center">
        <input
          onChange={(e) => setPasword(e.target.value)}
          value={password}
          type={showPassword ? "text" : "password"}
          className={`w-full ${
            !showPassword && password && "font-bold"
          }  outline-none`}
          placeholder="Password"
          required
        />
        {showPassword ? (
          <FaRegEye
            onClick={() => {
              setShowPassword(false);
            }}
            className=""
          />
        ) : (
          <FaRegEyeSlash
            onClick={() => {
              setShowPassword(true);
            }}
            className=""
          />
        )}
      </span>
      <div className="w-full flex justify-end text-sm mt-[-8px]">
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className=" cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className=" cursor-pointer"
          >
            Already have account!?
          </p>
        )}
      </div>
      <button className="text-white  font-regular px-8 py-2 mt-4 bg-[#ff8787]">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
