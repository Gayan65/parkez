import { useContext } from "react";
import { BuildingsContext } from "../context/BuildingContext";

export const useBuildingsContext = () => {
  const context = useContext(BuildingsContext);

  if (!context) {
    throw Error(
      "useBuildingContext must be used inside a buildingContextProvider"
    );
  }

  return context;
};
