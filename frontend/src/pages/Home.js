import React from "react";
import AllParkingLots from "../components/AllParkingLots";

//components
import { useAuthContext } from "../hooks/useAuthContext";
import LandingPara from "../components/LandingPara";

const Home = () => {
    const { user } = useAuthContext();
    return (
        <div>
            <h1>Home page</h1>
            <LandingPara />
            {user && <AllParkingLots />}
        </div>
    );
};

export default Home;
