import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ParksContextProvider } from "./context/ParkContext";
import { BuildingsContextProvider } from "./context/BuildingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BuildingsContextProvider>
        <ParksContextProvider>
          <App />
        </ParksContextProvider>
      </BuildingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
