import "../App.css";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import Login from "./popup/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2 } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="Home">
      <Header title="The One and Only Holder | KeyHolder" />
      <ToastContainer />
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
          {showPopup && <Login setShowPopup={setShowPopup} />}

          {!localStorage.getItem("token") ? (
            <div>
              <h1 className="slogan-text">
                <strong>Secure Cloud Image Storage Solution</strong>
              </h1>

              <button
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
                onClick={() => setShowPopup(true)}
              >
                Upload images
              </button>
            </div>
          ) : (
            <div>
              <h1 className="slogan-text">
                <strong>Cloud Image Storage service</strong>
              </h1>

              <button
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
                onClick={() => navigate("/upload")}
              >
                Upload images
              </button>
            </div>
          )}
        </div>

        <div className="mission-parent-div" style={{ margin: "50px 0px" }}>
          <div className="mission-div">
            <h2 className="centered-content">
              Leverage KeyHolder Solutions for Advanced Image Protection and
              Storage 🛡️
            </h2>
          </div>
          <div className="mission-div">
            <img
              src="https://s3.ca-central-1.amazonaws.com/myswecompany.com/secure-character.png"
              alt="Secure Character"
              style={{ width: "100%" }}
            />
          </div>

          <div className="mission-div">
            <h1 className="centered-content">
              <FontAwesomeIcon
                icon={fa1}
                style={{ color: "#ffa200", marginRight: "10px" }}
              />
              Google Login
            </h1>
            <p>
              Enhance your security posture by leveraging our advanced
              authentication system available through third-party login
              mechanisms.
            </p>
          </div>
          <div className="mission-div">
            <img
              src="https://s3.ca-central-1.amazonaws.com/myswecompany.com/sign-in-with-google.webp"
              alt="Sign in with Google"
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>

          <div className="mission-div">
            <h1 className="centered-content">
              <FontAwesomeIcon
                icon={fa2}
                style={{ color: "#ffa200", marginRight: "10px" }}
              />{" "}
              Google Authenticator
            </h1>
            <p>
              Employ immediate QR code verification through Google Authenticator
              to fortify defenses against potential cybersecurity breaches.
            </p>
          </div>
          <div className="mission-div">
            <img
              src="https://s3.ca-central-1.amazonaws.com/myswecompany.com/auth.jpeg"
              alt=""
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
