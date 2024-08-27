import { useContext } from "react";
import { MyParkingsContext } from "../context/MyParkingContext";

export const useParkingRequestContext = () => {
    const context = useContext(MyParkingsContext);

    if (!context) {
        throw Error(
            "useMyParkingsContext must be used inside a MyParkingsContextProvider"
        );
    }

    return context;
};
