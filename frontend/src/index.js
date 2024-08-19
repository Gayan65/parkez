import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ParksContextProvider } from "./context/ParkContext";
import { BuildingsContextProvider } from "./context/BuildingContext";
import { ParkingRequestsContextProvider } from "./context/ParkingRequestContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BuildingsContextProvider>
        <ParkingRequestsContextProvider>
          <ParksContextProvider>
            <App />
          </ParksContextProvider>
        </ParkingRequestsContextProvider>
      </BuildingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
