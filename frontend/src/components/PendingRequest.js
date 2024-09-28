import React, { useEffect } from "react";
import { useParkingRequestContext } from "../hooks/useParkingRequestContext";
import ParkingRequestDetail from "./ParkingRequestDetail";

const PendingRequest = () => {
    //context
    const { parkingRequests, parking_request_dispatch } =
        useParkingRequestContext();

    //fetch all parking requests - (need for refetch even if there are state changes from other components, there it has been called outside the useEffect function)
    const fetchAllParkingRequests = async () => {
        const response = await fetch("/api/park_request");
        const json = await response.json();

        if (response.ok) {
            parking_request_dispatch({
                type: "SET_PARKING_REQUESTS",
                payload: json,
            });
        }
    };

    useEffect(() => {
        fetchAllParkingRequests();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parking_request_dispatch]);

    console.log(parkingRequests);

    //Filter parking requests by status "initiate"
    const pendingRequests = parkingRequests?.filter(
        (parkingRequest) => parkingRequest.status === "initiate"
    );

    //Created handleStatusChange to update the status and re-fetch the list
    const handleStatusChange = async (
        requestId,
        newStatus,
        newComment,
        parkingLot_id,
        newParkingStatus,
        user
    ) => {
        const response = await fetch(`/api/park_request/${requestId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus, comments: newComment }),
        });

        //patch request for the park lot (user, status change) here... (call by the parkingLot_id) - WHEN APPROVING OR DECLINING A PARKING LOT IT BECOMES ASSIGNED OR ACTIVE
        // eslint-disable-next-line
        const parkLotUpdateResponse = await fetch(
            `/api/park/${parkingLot_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newParkingStatus, user }),
            }
        );

        if (response.ok) {
            fetchAllParkingRequests(); // Re-fetch after status change
        }
    };
    return (
        <div className="container-custom">
            {pendingRequests &&
                pendingRequests.map((parkingRequest, i) => (
                    <ParkingRequestDetail
                        key={parkingRequest._id}
                        requestId={parkingRequest._id}
                        email={parkingRequest.user}
                        building={parkingRequest.building}
                        apartment={parkingRequest.apartment}
                        room={parkingRequest.room}
                        parkingLot={parkingRequest.parkingLot}
                        parkingLot_id={parkingRequest.parkingLot_id}
                        requestedDate={parkingRequest.createdAt}
                        requestComment={parkingRequest.requestComment}
                        onStatusChange={handleStatusChange}
                    />
                ))}
        </div>
    );
};

export default PendingRequest;
