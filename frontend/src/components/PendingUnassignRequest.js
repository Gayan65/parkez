import React, { useEffect } from "react";
import { useParkingUnassignRequestContext } from "../hooks/useParkingUnassignRequestContext";
import PendingUnassignRequestDetail from "./PendingUnassignRequestDetail";

const PendingUnassignRequest = ({ totalNotifications }) => {
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

    //Filter parking requests by status "initiate"
    const pendingRequests = parkingUnassignRequests?.filter(
        (parkingUnassignRequest) => parkingUnassignRequest.status === "initiate"
    );

    //Calculate total number of pending requests
    const totalPendingRequests = pendingRequests ? pendingRequests.length : 0;

    // Separate effect to update totalNotifications
    useEffect(() => {
        if (typeof totalNotifications === "function") {
            totalNotifications(totalPendingRequests);
        }
    }, [totalPendingRequests, totalNotifications]);

    //Created handleStatusChange to update the status and re-fetch the list
    const handleStatusChange = async (
        requestId,
        newStatus,
        newComment,
        parkingLot_id,
        newParkingStatus,
        user
    ) => {
        const response = await fetch(
            `/api/park_unassign_request/${requestId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: newStatus,
                    comments: newComment,
                }),
            }
        );

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
            fetchAllParkingUnassignRequests(); // Re-fetch after status change
        }
    };

    return (
        <div className="container">
            {pendingRequests &&
                pendingRequests.map((parkingUnassignRequest) => (
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
                        onStatusChange={handleStatusChange}
                        requestId={parkingUnassignRequest._id}
                    />
                ))}
        </div>
    );
};

export default PendingUnassignRequest;
