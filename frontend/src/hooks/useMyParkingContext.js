import { useContext } from "react";
import { MyParkingsContext } from "../context/MyParkingContext";

export const useMyParkingContext = () => {
    const context = useContext(MyParkingsContext);

    if (!context) {
        throw Error(
            "useMyParkingsContext must be used inside a MyParkingsContextProvider"
        );
    }

    return context;
};
