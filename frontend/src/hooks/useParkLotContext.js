import { useContext } from "react";
import { ParksContext } from "../context/ParkContext";

export const useParkLotContext = () => {
    const context = useContext(ParksContext);

    if (!context) {
        throw Error(
            "useParkLotContext must be used inside a ParkContextProvider"
        );
    }

    return context;
};
