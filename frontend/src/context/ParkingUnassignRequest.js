import { createContext, useReducer } from "react";

export const ParkingUnassignRequestsContext = createContext();

export const parkingUnassignRequestsReducer = (state, action) => {
    switch (action.type) {
        case "SET_PARKING_UNASSIGN_REQUESTS":
            return { parkingUnassignRequests: action.payload };

        case "CREATE_PARKING_UNASSIGN_REQUEST":
            return {
                parkingUnassignRequests: [
                    action.payload,
                    ...state.parkingUnassignRequests,
                ],
            };

        //delete parks
        //modify parks
        default:
            return state;
    }
};

export const ParkingUnassignRequestsContextProvider = ({ children }) => {
    const [state, parking_unassign_request_dispatch] = useReducer(
        parkingUnassignRequestsReducer,
        {
            parkingUnassignRequests: [], // this added for bug fixing iterable error
        }
    );

    return (
        <ParkingUnassignRequestsContext.Provider
            value={{ ...state, parking_unassign_request_dispatch }}
        >
            {children}
        </ParkingUnassignRequestsContext.Provider>
    );
};
