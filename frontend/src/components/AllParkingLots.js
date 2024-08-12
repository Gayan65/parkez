import React, { useEffect } from "react";
import ParkingLotDetails from "./ParkingLotDetails";

import { useParkLotContext } from "../hooks/useParkLotContext";

const AllParkingLots = () => {
    const { parks, park_dispatch } = useParkLotContext();

    useEffect(() => {
        //fetching all the car park lots
        const fetchParkingLots = async () => {
            const response = await fetch("/api/park");
            const json = await response.json();

            if (response.ok) {
                //set the state
                park_dispatch({ type: "SET_PARKS", payload: json });
            }
        };

        fetchParkingLots();
    }, [park_dispatch]);

    return (
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
    );
};

export default AllParkingLots;
