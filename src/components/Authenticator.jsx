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
  const [verifiedBefore, setVerifiedBefore] = useState(false);

  const navigate = useNavigate();

  const verified = localStorage.getItem("verified");

  useEffect(() => {
    if (verified === "true") {
      navigate("/upload");
    }

    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    const generate = async () => {
      try {
        const res = await axios.get(
          `${REACT_APP_API_ENDPOINT}/generate/${localStorage.getItem("id")}`
        );
        // console.log(res.data.verified);
        setVerifiedBefore(res.data.verified);
        setDataURL(res.data.dataURL);
        setSecret(res.data.secret);
      } catch (error) {
        console.error("Error generating QR Code", error);
      }
    };

    generate();
  }, []);

  const verifyToken = async () => {
    try {
      const res = await axios.post(
        `${REACT_APP_API_ENDPOINT}/verify/${localStorage.getItem("id")}`,
        {
          token,
          secret,
        }
      );
      if (res.data.verified) {
        localStorage.setItem("scannedQRcode", "true");
        localStorage.setItem("verified", "true");
        alert("Verified!");
        navigate("/upload");
      } else {
        localStorage.setItem("scannedQRcode", "false");
        localStorage.setItem("verified", "true");
        alert("Verification Failed!");
        navigate("/upload");
      }
    } catch (error) {
      console.error("Error verifying token", error);
    }
  };

  return (
    <div>
      <Header title="Verify Your Indentity" />
      <div>
        <div className="qr-code-div">
          <h1 style={{ margin: "20px 0px" }}>
            Scan the QR code via "
            <strong style={{ color: "rgb(0, 213, 255)" }}>
              Google Authenticator mobile app
            </strong>
            "
          </h1>

          {verifiedBefore === true ? null : (
            <img className="qr-code-image" src={dataURL} alt="QR Code" />
          )}

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
            onClick={() => {
              verifyToken();
            }}
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
