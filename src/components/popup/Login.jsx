import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../Header.css";
import { GoogleLogin } from "@react-oauth/google";
import Login_auth from "../popup/Login_auth";
import jwt_decode from "jwt-decode";

const { REACT_APP_API_ENDPOINT } = process.env;

const Login = ({ setShowPopup, setShowRegisterPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [loginMethod, setLoginMethod] = useState(true);
  const [login, setLogin] = useState(false);

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
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

            {loginMethod ? (
              <div>
                <div className="D_akX" style={{ width: "100%" }}>
                  <GoogleLogin
                    className="D_akX"
                    onSuccess={(credentialResponse) => {
                      var decoded = jwt_decode(credentialResponse.credential);
                      // handleGoogleSubmit(
                      //   decoded.sub,
                      //   decoded.name,
                      //   decoded.given_name,
                      //   decoded.family_name,
                      //   decoded.email,
                      //   decoded.picture
                      // );
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>

                <button
                  className="D_pY D_qu D_qm D_qh D_qy D_akX_1"
                  type="button"
                >
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <img
                      alt=""
                      className="D_oV D_oS D_akZ"
                      crossOrigin="anonymous"
                      src="https://mweb-cdn.karousell.com/build/mobile-and-email-icon-151eb72cf0.svg"
                      title=""
                    />
                    <div
                      style={{ width: "100%" }}
                      onClick={() => {
                        setLoginMethod(false);
                        setLogin(true);
                      }}
                    >
                      <p
                        style={{
                          textAlign: "center",
                          fontWeight: "normal",
                          fontSize: "0.9rem",
                        }}
                      >
                        Email
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <>
                <Login_auth />
                <button
                  className="other-log-in-optinos"
                  onClick={() => setLoginMethod(true)}
                >
                  Other Log in options
                </button>
              </>
            )}

            <div className="D_alb">
              <p
                className="D_pv D_os D_pw D_p_ D_pC D_pG D_pI D_pL"
                style={{ textAlign: "center", fontSize: "0.9rem" }}
              >
                Don't have an account yet?{" "}
                <a
                  className="D_alc D_AB"
                  href="#"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPopup(false);
                    setShowRegisterPopup(true);
                  }}
                  style={{ color: "#008f79", fontWeight: "bold" }}
                >
                  Create account
                </a>
              </p>
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
