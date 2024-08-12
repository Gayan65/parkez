import { createContext, useReducer } from "react";

export const ParksContext = createContext();

export const parksReducer = (state, action) => {
    switch (action.type) {
        case "SET_PARKS":
            return { parks: action.payload };

        case "CREATE_PARK":
            return { parks: [action.payload, ...state.parks] };

        //delete parks
        //modify parks
        default:
            return state;
    }
};

export const ParksContextProvider = ({ children }) => {
    const [state, park_dispatch] = useReducer(parksReducer, {
        parks: null,
    });

    return (
        <ParksContext.Provider value={{ ...state, park_dispatch }}>
            {children}
        </ParksContext.Provider>
    );
};
