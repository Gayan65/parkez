import { useContext } from "react";
import { ParkingUnassignRequestsContext } from "../context/ParkingUnassignRequest";

export const useParkingRequestContext = () => {
    const context = useContext(ParkingUnassignRequestsContext);

    if (!context) {
        throw Error(
            "useParkingUnassignRequestContext must be used inside a ParkingUnassignRequestsContextProvider"
        );
    }

    return context;
};
