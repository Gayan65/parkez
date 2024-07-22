import React, { useEffect } from "react";

const AllParkingLots = () => {
    useEffect(() => {
        //fetching all the car park lots
        const fetchParkingLots = async () => {
            const response = await fetch();
            const json = await response.json();

            if (response.ok) {
                //set the state
            }
        };

        fetchParkingLots();
    }, []);

    return <div></div>;
};

export default AllParkingLots;
