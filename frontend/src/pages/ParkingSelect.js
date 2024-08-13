import React from "react";
import { useLocation } from "react-router-dom";

const ParkingSelect = () => {
    const location = useLocation();

    //accessing the state via location
    const { building, apartment, room } = location.state;
    return (
        <div>
            Parking select {building} , {apartment}, {room}
        </div>
    );
};

export default ParkingSelect;
