import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import HomeUserForm from "../components/HomeUserForm";

const ParkRequest = () => {
    //get user
    const { user } = useAuthContext();

    return <div>{user && <HomeUserForm />}</div>;
};

export default ParkRequest;
