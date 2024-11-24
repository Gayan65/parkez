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

//translation pages
import homepage_en from "./translations/en/homepage.json";
import homepage_fi from "./translations/fi/homepage.json";
import navbar_en from "./translations/en/navbar.json";
import navbar_fi from "./translations/fi/navbar.json";
import footer_en from "./translations/en/footer.json";
import footer_fi from "./translations/fi/footer.json";
import login_en from "./translations/en/login.json";
import login_fi from "./translations/fi/login.json";
import signup_en from "./translations/en/signup.json";
import signup_fi from "./translations/fi/signup.json";
import homeuserform_en from "./translations/en/HomeUserForm.json";
import homeuserform_fi from "./translations/fi/HomeUserForm.json";
import parkingselect_en from "./translations/en/parkingselect.json";
import parkingselect_fi from "./translations/fi/parkingselect.json";
import createbuildingpage_en from "./translations/en/createbuildingpage.json";
import createbuildingpage_fi from "./translations/fi/createbuildingpage.json";
import createbuildingform_en from "./translations/en/createbuildingform.json";
import createbuildingform_fi from "./translations/fi/createbuildingform.json";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
    interpolation: { escapeValue: false },
    lng: "fi",
    resources: {
        fi: {
            homepage: homepage_fi,
            navbar: navbar_fi,
            footer: footer_fi,
            login: login_fi,
            signup: signup_fi,
            homeuserform: homeuserform_fi,
            parkingselect: parkingselect_fi,
            createbuildingpage: createbuildingpage_fi,
            createbuildingform: createbuildingform_fi,
        },
        en: {
            homepage: homepage_en,
            navbar: navbar_en,
            footer: footer_en,
            login: login_en,
            signup: signup_en,
            homeuserform: homeuserform_en,
            parkingselect: parkingselect_en,
            createbuildingpage: createbuildingpage_en,
            createbuildingform: createbuildingform_en,
        },
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
