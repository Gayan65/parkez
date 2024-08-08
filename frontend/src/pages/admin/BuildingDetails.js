import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useBuildingsContext } from "../../hooks/useBuildingsContext";

const BuildingDetails = () => {
  const { building, dispatch } = useBuildingsContext();

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

    fetchBuilding();
  }, [dispatch, id]);

  return (
    <div>
      {" "}
      {building && (
        <div>
          {" "}
          BuildingDetails {building[0].name} {building[0].number}
        </div>
      )}{" "}
    </div>
  );
};

export default BuildingDetails;
