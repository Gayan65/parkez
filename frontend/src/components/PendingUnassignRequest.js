import React from "react";
import { useParkingUnassignRequestContext } from "../hooks/useParkingUnassignRequestContext";

const PendingUnassignRequest = () => {
    //context
    const { parkingUnassignRequests, parking_unassign_request_dispatch } =
        useParkingUnassignRequestContext();

    return <div></div>;
};

export default PendingUnassignRequest;
