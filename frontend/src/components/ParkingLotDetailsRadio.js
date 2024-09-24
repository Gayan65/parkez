import React from "react";

const ParkingLotDetailsRadio = ({ lot, status, i, onSelect, disable }) => {
    return (
        <div>
            <input
                type="radio"
                className="parking-slot-btn"
                name="btnradio"
                id={i}
                autoComplete="off"
                onChange={onSelect}
                disabled={disable}
            />
            <label
                className={
                    status === "assign"
                        ? "btn-outline-primary-parking btn-outline-primary-parking-reserved"
                        : "btn-outline-primary-parking"
                }
                htmlFor={i}
            >
                {lot}, {status}
            </label>
        </div>
    );
};

export default ParkingLotDetailsRadio;
