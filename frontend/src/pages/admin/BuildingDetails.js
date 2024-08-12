import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import { useParkLotContext } from "../../hooks/useParkLotContext";
//components
import BuildingViewCard from "../../components/BuildingViewCard";
import CreateParkingForm from "../../components/CreateParkingForm";
import ParkingLotDetails from "../../components/ParkingLotDetails";

const BuildingDetails = () => {
  const { building, dispatch } = useBuildingsContext();
  const { parks, park_dispatch } = useParkLotContext();

  //get id from the params
  const { id } = useParams();

  useEffect(() => {
    const fetchBuilding = async () => {
      const response = await fetch(`/api/building/${id}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_A_BUILDING", payload: json });
      }
    };

    const fetchAllParking = async () => {
      const response = await fetch(`/api/park/${id}`);
      const json = await response.json();

      if (response.ok) {
        park_dispatch({ type: "SET_PARKS", payload: json });
      }
    };

    fetchBuilding();
    fetchAllParking();
  }, [dispatch, park_dispatch, id]);

  return (
    <div>
      <div>
        {building && (
          <BuildingViewCard
            name={building[0].name}
            number={building[0].number}
            address={building[0].address}
          />
        )}
      </div>

      <div>
        <h3>Parking Slots</h3>
        <CreateParkingForm building_id={id} />
      </div>

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
    </div>
  );
};

export default BuildingDetails;
