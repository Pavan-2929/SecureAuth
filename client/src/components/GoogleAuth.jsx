import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        "http://localhost:3000/api/auth/google",
        {
          username: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(login());
        navigate("/");
        toast.success("LoggedIn Successfully", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
      } else {
        toast.error("Enter valid Information", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
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
    <button
      type="submit"
      onClick={handleGoogleClick}
      className="bg-purple-700 text-white p-2 mt-5 hover:bg-purple-900 rounded"
    >
      Google
    </button>
  );
};

export default GoogleAuth;
