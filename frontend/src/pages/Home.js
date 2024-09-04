import React from "react";

//components
import { useAuthContext } from "../hooks/useAuthContext";
import LandingPara from "../components/LandingPara";
import HomeUserForm from "../components/HomeUserForm";
import PendingRequest from "../components/PendingRequest";
import PendingUnassignRequest from "../components/PendingUnassignRequest";

const Home = () => {
    const { user } = useAuthContext();
    return (
        <div>
            <h1>Home page</h1>
            <LandingPara />
            {user && <HomeUserForm />}
            {user && user.admin && <PendingRequest />}
            <p>unassigned requests</p>
            {user && user.admin && <PendingUnassignRequest />}
        </div>
    );
};

export default Home;
