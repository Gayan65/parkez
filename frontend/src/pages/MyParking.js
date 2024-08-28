import React, { useEffect } from "react";
import { useMyParkingContext } from "../hooks/useMyParkingContext";
import { useAuthContext } from "../hooks/useAuthContext";
import MyParkingDetail from "../components/MyParkingDetail";

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
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 ">
                        {myParks &&
                            myParks.map((myPark) => (
                                <MyParkingDetail
                                    lot={myPark.lot}
                                    status={myPark.status}
                                    modifiedDate={myPark.updatedAt}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyParking;
