import React from "react";

//components
import { useAuthContext } from "../hooks/useAuthContext";
import LandingPara from "../components/LandingPara";
import HomeUserForm from "../components/HomeUserForm";

const Home = () => {
    const { user } = useAuthContext();
    return (
        <div>
            <h1>Home page</h1>
            <LandingPara />
            {user && <HomeUserForm />}
        </div>
    );
};

export default Home;
