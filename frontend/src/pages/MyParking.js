import React, { useEffect } from "react";
import { useMyParkingContext } from "../hooks/useMyParkingContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MyParking = () => {
    //context
    const { myParks, my_park_dispatch } = useMyParkingContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchAllMyParks = async () => {
            //user obj
            const userData = {
                user: user.email,
            };

            //post user data to api
            const response = await fetch("/api/park/by_email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const json = await response.json();

            if (response.ok) {
                my_park_dispatch({ type: "SET_MY_PARKS", payload: json });
            }
        };

        fetchAllMyParks();
    }, [my_park_dispatch, user]);

    console.log(myParks);

    return (
        <div>
            My parking page
            <div>
                {myParks &&
                    myParks.map((myPark) => (
                        <p key={myPark._id}> {myPark.lot} </p>
                    ))}
            </div>
        </div>
    );
};

export default MyParking;
