import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import imgLogo from "../assets/img/LandingLogo.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { motion } from "framer-motion";

const LandingPara = () => {
    //get user context
    const { user } = useAuthContext();
    const [t] = useTranslation("homepage");

    return (
        <div className="container hero-section mt-2">
            <div className="row align-items-center">
                <div className="col-md-5 hero-image-container">
                    <motion.img
                        src={imgLogo}
                        alt="Logo"
                        className="d-inline-block align-text-top"
                        initial={{ opacity: 0, x: -10, y: -10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                    ></motion.img>
                </div>

                <div className="col-md-7 hero-text hero-section">
                    <motion.h1
                        className="display-5 fw-bold lh-1 mb-3 hero-heading"
                        initial={{ y: -40 }}
                        animate={{ y: -10 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 120,
                        }}
                    >
                        {t("heading")}
                    </motion.h1>
                    <motion.p
                        className="lead"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        {t("content")}
                    </motion.p>
                    <motion.p
                        className="lead"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1.5 }}
                    >
                        {t("sub_content")}
                    </motion.p>
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
