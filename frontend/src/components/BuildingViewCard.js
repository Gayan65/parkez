import React from "react";

//date format
import { format } from "date-fns";

const BuildingViewCard = ({ name, number, address, createdAt }) => {
    return (
        <div className="card mb-3">
            <img
                src="https://via.placeholder.com/300"
                className="card-img-top"
                alt="..."
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
                <h5 className="card-title paragraph">
                    {name} {number}
                </h5>
                <p className="card-text paragraph">{address}</p>
                <p className="card-text">
                    <small className="text-body-secondary">
                        Created on{" "}
                        {format(new Date(createdAt), "EEEE, d/M/yyyy h:mma")}
                    </small>
                </p>
            </div>
        </div>
    );
};

export default BuildingViewCard;
