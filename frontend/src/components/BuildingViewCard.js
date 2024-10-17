import React from "react";

//icons
import { FcHome, FcExternal, FcDataSheet } from "react-icons/fc";

//date format
import { format } from "date-fns";

const BuildingViewCard = ({ name, number, address, createdAt, image }) => {
    return (
        <div className="card mb-3">
            <img
                //src="https://via.placeholder.com/300"
                src={image ? image : "https://via.placeholder.com/300"}
                className="card-img-top"
                alt="..."
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
                <h5
                    className="card-title paragraph"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <FcHome size={20} className="me-1" /> {name} {number}
                </h5>
                <p
                    className="card-text paragraph"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    {" "}
                    <FcExternal color="#ffbd59" size={16} className="me-2" />
                    {address}
                </p>
                <p className="card-text">
                    <small
                        className="text-body-secondary"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <FcDataSheet size={16} className="me-1" /> Created on{" "}
                        {format(new Date(createdAt), "EEEE, d/M/yyyy h:mma")}
                    </small>
                </p>
            </div>
        </div>
    );
};

export default BuildingViewCard;
