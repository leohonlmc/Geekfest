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
import Header from "./partial/Header";
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
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user);
      navigate("/upload");
    } catch (ex) {
      console.log(ex);
      toast.error("Email already exists or invalid email");
    }
  };

  return (
    <div className="Home">
      <Header />
      <div className="main">
        <div
          className="slogan"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column", // Added this line to make the flexbox a column layout
          }}
        >
          <div>
            <h1 className="slogan-text">
              <strong>Cloud Image Storage service</strong>
            </h1>

            <button className="btn btn-primary" style={{ marginTop: "10px" }}>
              Upload images
            </button>
          </div>
        </div>

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
  );
}

export default Home;
