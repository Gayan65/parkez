import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import imgLogo from "../assets/img/LandingLogo.png";
import { useAuthContext } from "../hooks/useAuthContext";

const LandingPara = () => {
    //get user context
    const { user } = useAuthContext();
    const [t] = useTranslation("homepage");

    return (
        <div className="container hero-section mt-2">
            <div className="row align-items-center">
                <div className="col-md-5 hero-image-container">
                    <img
                        src={imgLogo}
                        alt="Logo"
                        className="d-inline-block align-text-top"
                    ></img>
                </div>

                <div className="col-md-7 hero-text hero-section">
                    <h1 className="display-5 fw-bold lh-1 mb-3 hero-heading">
                        {t("heading")}
                    </h1>
                    <p className="lead">{t("content")}</p>
                    <p className="lead">{t("sub_content")}</p>
                    <Link
                        to={user ? "/park-request" : "/login"}
                        className="btn btn-custom"
                    >
                        {t("button")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPara;
