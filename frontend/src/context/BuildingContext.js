import { createContext, useReducer } from "react";

export const BuildingsContext = createContext();

export const buildingsReducer = (state, action) => {
    switch (action.type) {
        case "SET_BUILDINGS":
            return { buildings: action.payload };

        case "CREATE_BUILDINGS":
            return { buildings: [action.payload, ...state.buildings] };

        case "SET_A_BUILDING":
            return { building: action.payload };

        //delete buildings
        case "DELETE_BUILDING":
            return {
                buildings: state.buildings.filter(
                    (b) => b._id !== action.payload._id
                ),
            };
        //modify buildings
        default:
            return state;
    }
};

export const BuildingsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(buildingsReducer, {
        buildings: null,
    });

    return (
        <BuildingsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BuildingsContext.Provider>
    );
};
