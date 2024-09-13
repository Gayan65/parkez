import React from "react";

//components
import { useAuthContext } from "../hooks/useAuthContext";
import LandingPara from "../components/LandingPara";
import PendingRequest from "../components/PendingRequest";
import PendingUnassignRequest from "../components/PendingUnassignRequest";

const Home = () => {
    const { user } = useAuthContext();
    return (
        <div>
            <LandingPara />

            {user && user.admin && <PendingRequest />}

            {user && user.admin && <PendingUnassignRequest />}
        </div>
    );
};

export default Home;
