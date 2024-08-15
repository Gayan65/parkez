import React from "react";

const ParkingLotDetailsRadio = ({ lot, status, i }) => {
    return (
        <div>
            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id={i}
                autoComplete="off"
            />
            <label className="btn btn-outline-primary" htmlFor={i}>
                {lot}, {status}
            </label>
        </div>
    );
};

export default ParkingLotDetailsRadio;
