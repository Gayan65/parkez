import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ParksContextProvider } from "./context/ParkContext";
import { BuildingsContextProvider } from "./context/BuildingContext";
import { ParkingRequestsContextProvider } from "./context/ParkingRequestContext";
import { MyParkingsContextProvider } from "./context/MyParkingContext";
import { ParkingUnassignRequestsContextProvider } from "./context/ParkingUnassignRequest";
import { TasksContextProvider } from "./context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <BuildingsContextProvider>
                <ParkingRequestsContextProvider>
                    <ParksContextProvider>
                        <MyParkingsContextProvider>
                            <ParkingUnassignRequestsContextProvider>
                                <TasksContextProvider>
                                    <App />
                                </TasksContextProvider>
                            </ParkingUnassignRequestsContextProvider>
                        </MyParkingsContextProvider>
                    </ParksContextProvider>
                </ParkingRequestsContextProvider>
            </BuildingsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
