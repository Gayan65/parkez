import React from "react";
import imgLogo from "../assets/img/LandingLogo.png";

const LandingPara = () => {
    return (
        <div className="container hero-section mt-5">
            <div className="row align-items-center">
                <div className="col-md-6 hero-image-container">
                    <img
                        src={imgLogo}
                        alt="Logo"
                        className="d-inline-block align-text-top"
                    ></img>
                </div>

                <div className="col-md-6 hero-text">
                    <h1 className="hero-heading">Welcome to MOAS Parking</h1>
                    <p className="hero-paragraph">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum..
                    </p>
                    <a href="#get-started" className="btn btn-primary">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingPara;
