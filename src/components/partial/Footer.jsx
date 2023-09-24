import "../../App.css";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <footer
      class="bg-light text-center text-lg-start"
      style={{ position: "absolute", bottom: "0px", width: "100%" }}
    >
      <div
        class="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a class="text-dark" href="/">
          {" "}
          KeyHolder.com
        </a>
      </div>
    </footer>
  );
}

export default Header;
