import React, { useEffect } from "react";
import { useParkingRequestContext } from "../hooks/useParkingRequestContext";
import ParkingRequestDetail from "./ParkingRequestDetail";

const PendingRequest = () => {
  //context
  const { parkingRequests, parking_request_dispatch } =
    useParkingRequestContext();

  useEffect(() => {
    //fetch all parking requests
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

    fetchAllParkingRequests();
  }, [parking_request_dispatch]);

  console.log(parkingRequests);
  return (
    <div className="container">
      {parkingRequests &&
        parkingRequests.map((parkingRequest) => (
          <ParkingRequestDetail
            key={parkingRequest._id}
            requestId={parkingRequest._id}
            email={parkingRequest.user}
            building={parkingRequest.building}
            apartment={parkingRequest.apartment}
            room={parkingRequest.room}
            parkingLot={parkingRequest.parkingLot}
          />
        ))}
    </div>
  );
};

export default PendingRequest;
