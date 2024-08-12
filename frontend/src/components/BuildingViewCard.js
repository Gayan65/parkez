import React from "react";

const BuildingViewCard = ({ name, number, address }) => {
    return (
        <div className="card mb-3">
            {/*add this img <img src="..." className="card-img-top" alt="..." />*/}
            <div className="card-body">
                <h5 className="card-title">
                    {name} {number}
                </h5>
                <p className="card-text">{address}</p>
                <p className="card-text">
                    <small className="text-body-secondary">
                        Last updated 3 mins ago need to be added
                    </small>
                </p>
            </div>
        </div>
    );
};

export default BuildingViewCard;