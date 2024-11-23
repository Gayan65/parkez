import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
    const [t] = useTranslation("footer");

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 footer-section">
                        <h5>{t("headers.about")}</h5>
                        <p>{t("para")}</p>
                    </div>

                    <div className="col-md-4 footer-section">
                        <h5> {t("headers.quick_links")} </h5>
                        <ul className="footer-links">
                            <li>
                                <Link to={"/"}>{t("home")}</Link>
                            </li>
                            <li>
                                <Link to={"/about"}> {t("about")} </Link>
                            </li>
                            <li>
                                <Link to={"/contact"}> {t("contact")} </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-4 footer-section">
                        <h5> {t("headers.connect")} </h5>
                        <div className="social-icons">
                            <a href="/">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="/">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} ParkEz. {t("badge")}{" "}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
