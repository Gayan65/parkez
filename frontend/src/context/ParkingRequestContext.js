import { createContext, useReducer } from "react";

export const ParkingRequestsContext = createContext();

export const parkingRequestsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PARKING_REQUESTS":
      return { parkingRequests: action.payload };

    case "CREATE_PARKING_REQUEST":
      return { parkingRequests: [action.payload, ...state.parkingRequests] };

    //delete parks
    //modify parks
    default:
      return state;
  }
};

export const ParkingRequestsContextProvider = ({ children }) => {
  const [state, parking_request_dispatch] = useReducer(parkingRequestsReducer, {
    parkingRequests: [], // this added for bug fixing iterable error
  });

  return (
    <ParkingRequestsContext.Provider
      value={{ ...state, parking_request_dispatch }}
    >
      {children}
    </ParkingRequestsContext.Provider>
  );
};
