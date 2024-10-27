import React from "react";
import { Link } from "react-router-dom";
import { FcHome, FcExternal } from "react-icons/fc";

const BuildingView = ({ name, number, image, address, link }) => {
    return (
        <Link to={link} className="card-link-custom">
            <div
                className="card mb-3 container custom-card "
                style={{ maxWidth: "400px" }}
            >
                <div className="row g-0">
                    <div className="col-md-6  d-flex align-items-center">
                        {/* add this img tag later  */}
                        <img
                            src={
                                image
                                    ? image
                                    : "https://via.placeholder.com/110"
                            }
                            className="img-fluid rounded-start"
                            alt="..."
                            style={{ width: "195px", height: "110px" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h5 className="card-title d-flex align-items-center">
                                <FcHome size={20} className="me-1" /> {name}{" "}
                                {number}
                            </h5>
                            <p className="card-text d-flex align-items-center">
                                <FcExternal
                                    color="#ffbd59"
                                    size={16}
                                    className="me-2"
                                />
                                {address}
                            </p>
                            <div className="view-link " to={link}>
                                Click me for parking
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BuildingView;
