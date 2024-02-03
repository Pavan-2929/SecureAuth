import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsMenuOpen(false);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/logout",
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(logout());
        dispatch(setUser(null))
        navigate("/login");
        toast.success("Logout Successfully", {
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
      toast.error(`${error}`, {
        style: {
          borderRadius: "10px",
          background: "#282828",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  return (
    <nav className={`${isMenuOpen ? "bg-[#414141]" : ""} p-4 font-semibold`}>
      <div className="md:flex justify-around items-center">
        <div className="text-[2rem] flex justify-around items-center relative">
          <span className="text-purple-500 animate-fire">Auth</span>
          <div onClick={toggleMenu} className="md:hidden">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        <div>
          <ul
            className={`text-[1.3rem] md:flex ${
              isMenuOpen ? "block" : "hidden"
            } space-y-8 md:space-y-0 items-center flex flex-col md:flex-row justify-center `}
          >
            <li className="md:ml-5 xl:mx-5 sm:mt-0 mt-10 hover:text-purple-700">
              <NavLink to="/" onClick={closeMenu}>
                Home
              </NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li className="md:ml-5 xl:mx-5 hover:text-purple-700">
                  <NavLink to="/login" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-purple-700">
                  <NavLink to="/profile" onClick={closeMenu}>
                    {currentUser && currentUser.profilePicture && (
                      <img
                        src={
                          FormData.profilePicture || currentUser.profilePicture
                        }
                        alt="Profile"
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="md:ml-5 xl:mx-5 hover:text-purple-700">
                  <NavLink to="/register" onClick={closeMenu}>
                    Register
                  </NavLink>
                </li>
                <li className="md:ml-5 xl:mx-5 hover:text-purple-700">
                  <NavLink to="/login" onClick={closeMenu}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
