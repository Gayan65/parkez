import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        //remove from the local storage
        localStorage.removeItem("user");

        //set the payload type
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};
