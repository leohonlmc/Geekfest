import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../../Header.css";

const ViewIcon = ({ setShowPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const itemsList = Array.from({ length: 5 }, (_, index) => index + 1);
  const [imgindex, setImgIndex] = useState(0);

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  // const nextImg = () => {
  //   if (imgindex < arr.length - 1) {
  //     setImgIndex(imgindex + 1);
  //   } else {
  //     setImgIndex(0);
  //   }
  // };

  // const prevImg = () => {
  //   if (imgindex > 0) {
  //     setImgIndex(imgindex - 1);
  //   } else {
  //     setImgIndex(arr.length - 1);
  //   }
  // };

  return (
    <div>
      {isPopupVisible && (
        <div className="popup">
          <div
            className="d-flex"
            style={{
              width: "100%",
              padding: "24px 24px 0px 24px",
              height: "100%",
            }}
          >
            <div style={{ width: "100%" }}>
              <h1
                className="flex--item fl1 fs-headline1 v-truncate2"
                style={{ width: "100%", textAlign: "left" }}
              >
                {`View images`}
              </h1>

              <div>
                {/* <button
                  class="D_pW D_qs D_qk D_qp D_aUy-1"
                  type="button"
                  onClick={() => nextImg()}
                >
                  <FontAwesomeIcon icon={faAngleLeft} size="2xl" />
                </button> */}

                <img
                  src={`https://s3.ca-central-1.amazonaws.com/myswecompany.com/${props.image}`}
                  className="card-img-top"
                  style={{
                    height: "80vh",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  alt="..."
                  onClick={() => setShowPopup(true)}
                />

                {/* <button
                  class="D_pW D_qs D_qk D_qp D_aUy"
                  type="button"
                  onClick={() => prevImg()}
                >
                  <FontAwesomeIcon icon={faAngleRight} size="2xl" />
                </button> */}
              </div>
              <div className="all-card-img-section">
                <div className="all-card-img-sub-section">
                  <div
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={`https://s3.ca-central-1.amazonaws.com/myswecompany.com/${props.image}`}
                      style={{
                        width: "72px",
                        height: "72px",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="ml12 aside-cta flex--item print:d-none"
              onClick={closePopup}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ cursor: "pointer" }}
                size="lg"
              />
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
            width: 100%;
            height: 100%;
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

        `}
      </style>
    </div>
  );
};

export default ViewIcon;
