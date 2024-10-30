import React from "react";

const ParkingLotDetails = ({ lot, status, i, onSelect, disable }) => {
    const getClassForStatus = () => {
        switch (status) {
            case "assign":
                return "btn-outline-primary-parking btn-outline-primary-parking-reserved"; // Reserved status style
            case "pending":
                return "btn-outline-primary-parking btn-outline-primary-parking-pending"; // Pending status style
            case "active":
                return "btn-outline-primary-parking btn-outline-primary-parking-active"; // Available style
            case "maintenance":
                return "btn-outline-primary-parking btn-outline-primary-parking-maintenance"; // Maintenance style
            default:
                return "btn-outline-primary-parking"; // Default button style
        }
    };
    return (
        <div className="me-5">
            <input
                type="radio"
                className="parking-slot-btn"
                name="btnradio"
                id={i}
                autoComplete="off"
                onChange={onSelect}
                disabled={disable}
            />
            <label className={getClassForStatus()} htmlFor={i}>
                {lot}
            </label>
        </div>
    );
};

export default ParkingLotDetails;
