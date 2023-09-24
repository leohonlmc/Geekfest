import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, User, Authenticator } from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTKEY}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/upload" element={<User />} />
          <Route path="/auth" element={<Authenticator />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
