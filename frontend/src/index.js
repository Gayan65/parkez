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

import homepage_en from "./translations/en/homepage.json";
import homepage_fi from "./translations/fi/homepage.json";
import navbar_en from "./translations/en/navbar.json";
import navbar_fi from "./translations/fi/navbar.json";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
    interpolation: { escapeValue: false },
    lng: "fi",
    resources: {
        fi: { homepage: homepage_fi, navbar: navbar_fi },
        en: { homepage: homepage_en, navbar: navbar_en },
    },
});

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
                                    <I18nextProvider i18n={i18next}>
                                        <App />
                                    </I18nextProvider>
                                </TasksContextProvider>
                            </ParkingUnassignRequestsContextProvider>
                        </MyParkingsContextProvider>
                    </ParksContextProvider>
                </ParkingRequestsContextProvider>
            </BuildingsContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
