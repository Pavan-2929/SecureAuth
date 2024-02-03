import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/auth/authSlice";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      const user = await axios.get("http://localhost:3000/api/user", {
        withCredentials: true,
      });
      dispatch(setUser(user.data));
      setUserData(user.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4 text-center">
      {isLoggedIn ? (
        <div className="bg-[#282828] p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4 text-white">
            Hello, {userData.username}!
          </h1>
          <p className="text-lg text-white">
            Welcome to our awesome platform. Explore and enjoy your time!
          </p>
        </div>
      ) : (
        <div className="bg-[#282828]  p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">
            You need to login/Register first
          </h1>
          <p className="text-lg">
            Sign in or register to access exclusive features and content.
          </p>
          <div className="mt-8">
            <NavLink to='/login' className="bg-blue-500 text-white px-4 py-2 rounded-full">
              Login
            </NavLink>
            <span className="ml-2">or</span>
            <NavLink to='/register' className="bg-green-500 text-white px-4 py-2 rounded-full ml-2">
              Register
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
