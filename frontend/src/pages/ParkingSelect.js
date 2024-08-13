import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useParkLotContext } from "../hooks/useParkLotContext";
import ParkingLotDetails from "../components/ParkingLotDetails";

const ParkingSelect = () => {
    const location = useLocation();

    const { parks, park_dispatch } = useParkLotContext();
    //accessing the state via location
    const { building, apartment, room } = location.state;

    useEffect(() => {
        //fetch all parking lots
        const fetchAllParking = async () => {
            const response = await fetch(`/api/park/${building}`);
            const json = await response.json();

            if (response.ok) {
                park_dispatch({ type: "SET_PARKS", payload: json });
            }
        };

        fetchAllParking();
    }, [park_dispatch, building]);
    return (
        <div>
            Parking select {building} , {apartment}, {room}
            <div className="container text-center">
                <div className="row row-cols-3">
                    {parks &&
                        parks.map((parkingLot) => (
                            <ParkingLotDetails
                                key={parkingLot._id}
                                lot={parkingLot.lot}
                                status={parkingLot.status}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ParkingSelect;
