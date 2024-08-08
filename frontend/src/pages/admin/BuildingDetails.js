import React from "react";
import { useParams } from "react-router-dom";

const BuildingDetails = () => {
  const { id } = useParams();
  return <div>BuildingDetails {id} </div>;
};

export default BuildingDetails;
