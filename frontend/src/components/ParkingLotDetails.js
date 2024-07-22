import React from "react";

const ParkingLotDetails = (props) => {
    return (
        <div className="col">
            <h5> {props.lot} </h5>
            <p> {props.status} </p>
        </div>
    );
};

export default ParkingLotDetails;
