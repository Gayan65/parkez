import React, { useEffect, useState } from "react";
import ParkingLotDetails from "./ParkingLotDetails";

const AllParkingLots = () => {
    const [parkingLots, setParkingLots] = useState(null);

    useEffect(() => {
        //fetching all the car park lots
        const fetchParkingLots = async () => {
            const response = await fetch("/api/park");
            const json = await response.json();

            if (response.ok) {
                //set the state
                setParkingLots(json);
            }
        };

        fetchParkingLots();
    }, []);

    return (
        <div className="container text-center">
            <div className="row row-cols-3">
                {parkingLots &&
                    parkingLots.map((parkingLot) => (
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
