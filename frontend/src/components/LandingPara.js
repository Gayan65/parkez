import React from "react";
import imgLogo from "../assets/img/LandingLogo.png";

const LandingPara = () => {
    return (
        <div className="container hero-section mt-4">
            <div className="row align-items-center">
                <div className="col-md-6 hero-image-container">
                    <img
                        src={imgLogo}
                        alt="Logo"
                        className="d-inline-block align-text-top"
                    ></img>
                </div>

                <div className="col-md-6 hero-text hero-section">
                    <h1 className="display-5 fw-bold lh-1 mb-3 hero-heading">
                        Welcome to ParkEz services
                    </h1>
                    <p className="lead">
                        Finding a parking spot has never been easier. ParkEz is
                        designed to simplify the parking reservation process for
                        MOAS residents. With just a few clicks, you can secure a
                        spot at your desired <b>MOAS</b> location. Our platform
                        is built to make parking management seamless, allowing
                        you to reserve, manage, and communicate effortlessly.
                        Whether you're a resident or admin, ParkEz automates
                        everything, ensuring that your parking experience is
                        smooth and stress-free.
                    </p>
                    <p className="lead">
                        Start now and enjoy hassle-free parking with ParkEz!
                    </p>
                    <a href="#get-started" className="btn btn-custom">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingPara;
