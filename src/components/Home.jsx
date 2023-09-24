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

function Home() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="Home">
      <Header />
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
      </div>
      <Footer />
    </div>
  );
}

export default Home;
