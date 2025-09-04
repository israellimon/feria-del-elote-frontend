import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="269663714128-r4vbrgqs9tcanm9taqrv580ljs0ketka.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
