import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../Header.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { REACT_APP_API_ENDPOINT } = process.env;

const Login = ({ setShowPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

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
      localStorage.setItem("scannedQRcode", "false");
    } catch (ex) {
      console.log(ex);
      toast.error("Email already exists or invalid email");
    }
  };

  return (
    <div>
      {isPopupVisible && (
        <div className="popup">
          <div style={{ borderBottom: "1px solid #ccc", width: "100%" }}>
            <div className="d-flex" style={{ padding: "24px 24px 5px 24px" }}>
              <h1
                className="flex--item fl1 fs-headline1 v-truncate2"
                style={{ width: "100%", textAlign: "left" }}
              >
                {process.env.REACT_APP_NAME}
              </h1>

              <div className="ml12 aside-cta flex--item print:d-none">
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ cursor: "pointer" }}
                  onClick={closePopup}
                  size="lg"
                />
              </div>
            </div>
          </div>
          <div style={{ padding: "24px", width: "100%" }}>
            <h3 className="D_akS D_oF D_ou D_oJ D_oN D_oR">Login</h3>

            <div>
              <div className="D_akX" style={{ width: "100%" }}>
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
                    navigate("/auth");
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && <div className="overlay"></div>}

      <style>
        {`
          .popup {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            border-radius: 5px;
            width: 500px;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px; /* Adjust as needed */
          }

          .popup h2 {
            margin-bottom: 10px;
          }

          .popup p {
            margin-bottom: 20px;
          }

          .popup button {
            padding: 7px 10px;
            background-color: rgb(0, 213, 255);
            font-weight: bold;
            
          }

          .popup button:hover {
            background-color: rgb(1, 185, 222);
          }

          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9998;
          }

          @media (max-width: 750px) {
            .popup {
                width: 70%; 
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
