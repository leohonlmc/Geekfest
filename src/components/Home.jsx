import "../App.css";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { REACT_APP_API_ENDPOINT } = process.env;

function Home() {
  const navigate = useNavigate();

  const handleGoogleSubmit = async (
    sub,
    username,
    firstName,
    lastName,
    email,
    icon
  ) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/google/register`,
        {
          sub,
          username,
          firstName,
          lastName,
          email,
          icon,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user);
      navigate("/user");
    } catch (ex) {
      console.log(ex);
      toast.error("Email already exists or invalid email");
    }
  };

  return (
    <div className="Home">
      <div className="main">
        <div className="google-login-div">
          <h1>Cloud Image Storage service</h1>

          <GoogleLogin
            className="D_akX"
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              handleGoogleSubmit(
                decoded.sub,
                decoded.name,
                decoded.given_name,
                decoded.family_name,
                decoded.email,
                decoded.picture
              );
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
