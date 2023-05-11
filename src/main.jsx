import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RegisterProvider } from "../context/registerId";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <>
    <BrowserRouter>
      <RegisterProvider>
        <App />
      </RegisterProvider>
    </BrowserRouter>
  </>
);
