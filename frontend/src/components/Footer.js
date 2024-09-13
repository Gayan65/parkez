import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 footer-section">
                        <h5>About ParkEz</h5>
                        <p>
                            ParkEz provides a hassle-free way for MOAS users to
                            reserve parking spots. Fully automated and simple to
                            use.
                        </p>
                    </div>

                    <div className="col-md-4 footer-section">
                        <h5>Quick Links</h5>
                        <ul className="footer-links">
                            <li>
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li>
                                <Link to={"/about"}>About</Link>
                            </li>
                            <li>
                                <Link to={"/contact"}>Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-4 footer-section">
                        <h5>Connect</h5>
                        <div className="social-icons">
                            <a href="#">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2024 ParkEz. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
