import "../../App.css";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <footer
      className="bg-light text-center text-lg-start"
      style={{ width: "100%", padding: "0px", margin: "0px" }}
    >
      <div
        className="text-center p-3"
        style={{ backgroundColor: "transparent" }}
      >
        © 2023 Copyright:
        <a className="text-dark" href="/">
          {" "}
          KeyHolder.com
        </a>
      </div>
    </footer>
  );
}

export default Header;
