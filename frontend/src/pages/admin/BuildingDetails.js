import React from "react";
import { useParams } from "react-router-dom";

const BuildingDetails = () => {
  const { _id } = useParams();
  return <div>BuildingDetails {_id} </div>;
};

export default BuildingDetails;
