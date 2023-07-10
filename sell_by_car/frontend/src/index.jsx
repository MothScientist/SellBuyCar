import React from "react";
import ReactDOM from "react-dom";
import "../static/css/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { DataProvider } from "./components/RegistrationDataContext/RegistrationDataContext.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <DataProvider>
        <App />
        </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
