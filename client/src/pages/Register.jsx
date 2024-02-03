import React, { useState } from "react";
import RegisterImage from "../assets/RegisterImage.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(login());
        navigate("/");
        toast.success("Registration Successfully", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
      } else {
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }

    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(`${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#282828",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex justify-around items-center mt-6">
      <div className="hidden lg:flex">
        <img
          src={RegisterImage}
          alt="Register"
          className="w-[25rem] h-[30rem] object-cover rounded-lg"
        />
      </div>

      <form
        onSubmit={handleSubmitRegister}
        className="w-full lg:w-1/2 sm:p-8 p-4 rounded-lg mt-4 font-semibold bg-[#282828]"
      >
        <h1 className="sm:text-5xl text-3xl font-bold mb-6 text-gray-300 text-center">
          Register with your account
        </h1>

        <div className="mb-4">
          <label htmlFor="username" className="text-purple-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-gray-300 rounded-sm focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-purple-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-gray-300 rounded-sm focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-purple-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-gray-300 rounded-sm focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-purple-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleChange}
            className="w-full p-2 border bg-[#414141] text-gray-300 rounded-sm focus:outline-none"
          />
        </div>

        <div className="block sm:flex justify-between items-center">
          <div>
            <button
              type="submit"
              className="bg-purple-700 text-white p-2 mt-5 hover:bg-purple-900 rounded focus:outline-none mr-10"
            >
              Register Now
            </button>
            <GoogleAuth />
          </div>
          <div className="flex items-center text-[1.2rem]">
            <div className="mt-5">
              <h3 className="text-gray-300">Have an account?</h3>
            </div>
            <NavLink
              to="/login"
              className=" text-white p-2 mt-5 underline rounded ml-2 focus:outline-none"
            >
              Login
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
