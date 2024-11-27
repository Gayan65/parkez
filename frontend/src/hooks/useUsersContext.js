import { useContext } from "react";
import { UsersContext } from "../context/UsersContext";

export const useUsersContext = () => {
    const context = useContext(UsersContext);

    if (!context) {
        throw Error(
            "useUsersContext must be used inside a usersContextProvider"
        );
    }

    return context;
};
