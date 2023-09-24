import React, { useEffect, useState } from "react";
import "../Auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
const { REACT_APP_API_ENDPOINT } = process.env;

function Authenticator() {
  const [dataURL, setDataURL] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const scannedQRcode = localStorage.getItem("scannedQRcode");

  useEffect(() => {
    if (scannedQRcode === "true") {
      navigate("/upload");
    }

    const generate = async () => {
      try {
        const res = await axios.get(`${REACT_APP_API_ENDPOINT}/generate`);
        setDataURL(res.data.dataURL);
        setSecret(res.data.secret);
      } catch (error) {
        console.error("Error generating QR Code", error);
      }
    };

    if (scannedQRcode !== "true") {
      generate();
    }
  }, []);

  const verifyToken = async () => {
    try {
      const res = await axios.post(`${REACT_APP_API_ENDPOINT}/verify`, {
        token,
        secret,
      });
      if (res.data.verified) {
        localStorage.setItem("scannedQRcode", "true");
        alert("Verified!");
        navigate("/upload");
      } else {
        localStorage.setItem("scannedQRcode", "false");
        alert("Verification Failed!");
      }
    } catch (error) {
      console.error("Error verifying token", error);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <div className="qr-code-div">
          <h1 style={{ margin: "20px 0px" }}>
            Scan the QR code via "
            <strong style={{ color: " rgb(0, 213, 255)" }}>
              Google Authenticator mobile app
            </strong>
            "
          </h1>
          <img className="qr-code-image" src={dataURL} alt="QR Code" />
          <br />

          <label>
            Enter Token:
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </label>
          <button
            className="btn btn-primary"
            onClick={verifyToken}
            style={{ marginLeft: "10px" }}
          >
            Verify
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Authenticator;
