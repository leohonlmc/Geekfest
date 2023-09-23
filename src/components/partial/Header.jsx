import "../../App.css";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const { REACT_APP_API_ENDPOINT } = process.env;

function Header() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src="keyholder.png"
            alt=""
            style={{ width: "100px", marginLeft: "20px" }}
          />
        </a>
        <div className="navbar sub-navbar" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <a className="nav-link" href="/upload">
                  Upload
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setShowPopup(true)}
                >
                  Upload
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
