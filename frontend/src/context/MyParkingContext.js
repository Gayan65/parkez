import { createContext, useReducer } from "react";

export const MyParkingsContext = createContext();

export const myParksReducer = (state, action) => {
    switch (action.type) {
        case "SET_MY_PARKS":
            return { myParks: action.payload };

        //delete parks
        //modify parks
        default:
            return state;
    }
};

export const MyParkingsContextProvider = ({ children }) => {
    const [state, my_park_dispatch] = useReducer(myParksReducer, {
        myParks: null,
    });

    return (
        <MyParkingsContext.Provider value={{ ...state, my_park_dispatch }}>
            {children}
        </MyParkingsContext.Provider>
    );
};
