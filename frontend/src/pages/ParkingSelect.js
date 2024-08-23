import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParkLotContext } from "../hooks/useParkLotContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParkingRequestContext } from "../hooks/useParkingRequestContext";

//components
import ParkingLotDetailsRadio from "../components/ParkingLotDetailsRadio";

const ParkingSelect = () => {
  const location = useLocation();

  //get user context
  const { user } = useAuthContext();
  const { parks, park_dispatch } = useParkLotContext();
  const { parking_request_dispatch } = useParkingRequestContext();

  //accessing the state via location
  const { building, apartment, room, requestComment } = location.state;

  //states for select parking lots
  const [selectParkingLot, setSelectParkingLot] = useState({
    _id: "",
    number: "",
    status: "",
  });

  useEffect(() => {
    //fetch all parking lots
    const fetchAllParking = async () => {
      const response = await fetch(`/api/park/${building.id}`);
      const json = await response.json();

      if (response.ok) {
        park_dispatch({ type: "SET_PARKS", payload: json });
      }
    };

    fetchAllParking();
  }, [park_dispatch, building]);

  //passes multiple values and set via the function
  const handleSelectChange = (_id, number, status) => {
    setSelectParkingLot({ _id, number, status });
  };

  const handleClick = async () => {
    //selected parking lot details triggered
    console.log("request btn clicked");
    console.log(selectParkingLot.number);

    //parking request object
    const parkingRequest = {
      user: user.email,
      building: `${building.name} ${building.number}`,
      apartment: apartment,
      room: room,
      parkingLot: selectParkingLot.number,
      parkingLot_id: selectParkingLot._id,
      status: "initiate",
      comments: "",
      requestComment: requestComment,
    };

    //this obj send to the api
    const response = await fetch("/api/park_request/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parkingRequest),
    });

    const json = await response.json();

    if (response.ok) {
      parking_request_dispatch({
        type: "CREATE_PARKING_REQUEST",
        payload: json,
      });
      console.log("parking request added successful!");
    }

    //selected parking lot should be emended as pending
  };
  return (
    <div>
      Parking select Building{building.name} {building.number}, Apartment
      {apartment}, Room{room}
      <div className="container text-center">
        <div
          className="row row-cols-3 btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          {parks &&
            parks.map((parkingLot, i) => (
              <ParkingLotDetailsRadio
                key={parkingLot._id}
                lot={parkingLot.lot}
                status={parkingLot.status}
                i={i}
                onSelect={() =>
                  handleSelectChange(
                    parkingLot._id,
                    parkingLot.lot,
                    parkingLot.status
                  )
                }
              />
            ))}
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleClick}
        disabled={!selectParkingLot._id && true} //button get activated once the selection has been made
      >
        Request
      </button>
    </div>
  );
};

export default ParkingSelect;
