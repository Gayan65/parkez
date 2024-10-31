import React from "react";

const ParkingLotDetailsAdmin = ({ lot, status, i, onSelect, disable }) => {
    const getClassForStatus = () => {
        switch (status) {
            case "assign":
                return "btn-outline-primary-parking btn-outline-primary-parking-reserved admin-status"; // Reserved status style
            case "pending":
                return "btn-outline-primary-parking btn-outline-primary-parking-pending admin-status"; // Pending status style
            case "active":
                return "btn-outline-primary-parking btn-outline-primary-parking-active admin-status"; // Available style
            case "maintenance":
                return "btn-outline-primary-parking btn-outline-primary-parking-maintenance admin-status"; // Maintenance style
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
            />
            <label className={getClassForStatus()} htmlFor={i}>
                {lot}
            </label>
        </div>
    );
};

export default ParkingLotDetailsAdmin;
