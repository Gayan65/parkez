import React from "react";
import { useLocation } from "react-router-dom";

const ParkingSelect = () => {
    const location = useLocation();

    //accessing the state via location
    const { state } = location;
    return <div>Parking select {state}</div>;
};

export default ParkingSelect;
