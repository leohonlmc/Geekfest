import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../../Header.css";
import "react-toastify/dist/ReactToastify.css";

const { REACT_APP_API_ENDPOINT } = process.env;

const Loading = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  return (
    <div>
      {isPopupVisible && (
        <div className="popup">
          <div
            style={{
              borderBottom: "1px solid #ccc",
              width: "100%",
              padding: "20px 30px",
            }}
          >
            <h2>Image uploading to the cloud...</h2>
            <div
              style={{
                margin: "auto",
                textAlign: "center",
              }}
            >
              <FontAwesomeIcon icon={faSpinner} spin />
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

export default Loading;
