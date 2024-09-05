import React, { useEffect } from "react";
import { useParkingUnassignRequestContext } from "../hooks/useParkingUnassignRequestContext";
import PendingUnassignRequestDetail from "./PendingUnassignRequestDetail";

const PendingUnassignRequest = () => {
    //context
    const { parkingUnassignRequests, parking_unassign_request_dispatch } =
        useParkingUnassignRequestContext();

    //function to call api to fetch all the unassigned requests
    const fetchAllParkingUnassignRequests = async () => {
        const response = await fetch("/api/park_unassign_request");
        const json = await response.json();

        if (response.ok) {
            parking_unassign_request_dispatch({
                type: "SET_PARKING_UNASSIGN_REQUESTS",
                payload: json,
            });
        }
    };

    useEffect(() => {
        fetchAllParkingUnassignRequests();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parking_unassign_request_dispatch]);

    console.log("i am here", parkingUnassignRequests); //parking unassigned request stored here...

    return (
        <div className="container">
            {parkingUnassignRequests &&
                parkingUnassignRequests.map((parkingUnassignRequest) => (
                    <PendingUnassignRequestDetail
                        key={parkingUnassignRequest._id}
                        building={parkingUnassignRequest.building}
                        user={parkingUnassignRequest.user}
                        apartment={parkingUnassignRequest.apartment}
                        room={parkingUnassignRequest.room}
                        createdAt={parkingUnassignRequest.createdAt}
                        requestComment={parkingUnassignRequest.requestComment}
                        parkingLot={parkingUnassignRequest.parkingLot}
                        parkingLot_id={parkingUnassignRequest.parkingLot_id}
                        status={parkingUnassignRequest.status}
                    />
                ))}
        </div>
    );
};

export default PendingUnassignRequest;
