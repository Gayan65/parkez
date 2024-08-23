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

  //Created handleStatusChange to update the status and re-fetch the list
  const handleStatusChange = async (requestId, newStatus, newComment) => {
    const response = await fetch(`/api/park_request/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus, comments: newComment }),
    });

    //patch request for the park lot (user, status change) here... (call by the parkingLot_id)

    if (response.ok) {
      fetchAllParkingRequests(); // Re-fetch after status change
    }
  };
  return (
    <div className="container">
      {parkingRequests &&
        parkingRequests
          .filter((parkingRequest) => parkingRequest.status === "initiate") //added to filter according to the status of the parking request
          .map((parkingRequest) => (
            <ParkingRequestDetail
              key={parkingRequest._id}
              requestId={parkingRequest._id}
              email={parkingRequest.user}
              building={parkingRequest.building}
              apartment={parkingRequest.apartment}
              room={parkingRequest.room}
              parkingLot={parkingRequest.parkingLot}
              requestedDate={parkingRequest.createdAt}
              requestComment={parkingRequest.requestComment}
              onStatusChange={handleStatusChange}
            />
          ))}
    </div>
  );
};

export default PendingRequest;
