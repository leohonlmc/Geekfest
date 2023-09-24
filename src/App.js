import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, User } from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTKEY}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/upload" element={<User />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
