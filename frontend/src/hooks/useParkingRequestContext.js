import { useContext } from "react";
import { ParkingRequestsContext } from "../context/ParkingRequestContext";

export const useParkingRequestContext = () => {
  const context = useContext(ParkingRequestsContext);

  if (!context) {
    throw Error(
      "useParkingRequestContext must be used inside a ParkingRequestsContextProvider"
    );
  }

  return context;
};
