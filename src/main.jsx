import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RegisterProvider } from "../context/registerId";
import { registerSW } from "virtual:pwa-register";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
registerSW();
ReactDOM.createRoot(document.querySelector("#root")).render(
  <>
    <BrowserRouter>
      <RegisterProvider>
        <Home />
      </RegisterProvider>
    </BrowserRouter>
  </>
);
