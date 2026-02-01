import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { EmailData } from "./components/EmailData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <EmailData>
      <App />
    </EmailData>
  </BrowserRouter>
);
