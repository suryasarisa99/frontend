import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RegisterProvider } from "../context/registerId";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <>
    <RegisterProvider>
      <App />
    </RegisterProvider>
  </>
);
