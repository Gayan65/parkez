import React, { useEffect } from "react";
import { useParkingUnassignRequestContext } from "../hooks/useParkingUnassignRequestContext";
import { useAuthContext } from "../hooks/useAuthContext";
import PendingUnassignRequestDetail from "./PendingUnassignRequestDetail";

const PendingUnassignRequest = () => {
    //context
    const { parkingUnassignRequests, parking_unassign_request_dispatch } =
        useParkingUnassignRequestContext();
    const { user } = useAuthContext();

    //function to call api to fetch all the unassigned requests
    const fetchAllParkingUnassignRequests = async () => {
        const response = await fetch("/api/park_unassign_request", {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (response.ok) {
            parking_unassign_request_dispatch({
                type: "SET_PARKING_UNASSIGN_REQUESTS",
                payload: json,
            });
        }
    };

    useEffect(() => {
        //if user is there
        if (user) {
            fetchAllParkingUnassignRequests();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parking_unassign_request_dispatch]);

    //Filter parking requests by status "initiate"
    const pendingRequests = parkingUnassignRequests?.filter(
        (parkingUnassignRequest) => parkingUnassignRequest.status === "initiate"
    );

    //Created handleStatusChange to update the status and re-fetch the list
    const handleStatusChange = async (
        requestId,
        newStatus,
        newComment,
        parkingLot_id,
        newParkingStatus,
        userReq
    ) => {
        const response = await fetch(
            `/api/park_unassign_request/${requestId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    status: newStatus,
                    comments: newComment,
                }),
            }
        );

        console.log("this is the case", userReq);

        //patch request for the park lot (user, status change) here... (call by the parkingLot_id) - WHEN APPROVING OR DECLINING A PARKING LOT IT BECOMES ASSIGNED OR ACTIVE
        // eslint-disable-next-line
        const parkLotUpdateResponse = await fetch(
            `/api/park/${parkingLot_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    status: newParkingStatus,
                    user: userReq,
                }),
            }
        );

        if (response.ok) {
            fetchAllParkingUnassignRequests(); // Re-fetch after status change
        }
    };

    return (
        <div className="container-custom">
            {pendingRequests &&
                pendingRequests.map((parkingUnassignRequest) => (
                    <PendingUnassignRequestDetail
                        key={parkingUnassignRequest._id}
                        building={parkingUnassignRequest.building}
                        userReq={parkingUnassignRequest.user}
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
