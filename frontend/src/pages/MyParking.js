import React, { useEffect, useState } from "react";
import { useMyParkingContext } from "../hooks/useMyParkingContext";
import { useAuthContext } from "../hooks/useAuthContext";
import MyParkingDetail from "../components/MyParkingDetail";
import Loader from "../components/Loader";
import { fetchWrapper } from "../utils/fetchWrapper";

const MyParking = () => {
    //state
    const [loader, setLoader] = useState(false);

    //context
    const { myParks, my_park_dispatch } = useMyParkingContext();
    const { user } = useAuthContext();
    const fetchAllMyParks = async () => {
        //user obj
        const userData = {
            user: user.email,
        };

        try {
            //post user data to api
            setLoader(true);
            const response = await fetchWrapper("/api/park/by_email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`Error fetching buildings: ${response.status}`);
            }

            const json = await response.json();

            if (response.ok) {
                my_park_dispatch({ type: "SET_MY_PARKS", payload: json });
            }
        } catch (error) {
            console.error("Error in fetchBuildings:", error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAllMyParks();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [my_park_dispatch, user]);

    console.log(myParks);

    return (
        <div className="container mt-3">
            <h3 className="header mb-2">My Parking Slots</h3>
            <p className="paragraph text-justify">
                In this section, you can view your allocated parking spaces and,
                if needed, request to release a space. Submit an unallocation
                request if you’re permanently moving out of MOAS or transferring
                between MOAS apartments.
            </p>
            <p className="paragraph text-justify fw-light fst-italic">
                Please note: Once you submit an unallocation request, it may
                take some time for approval by the administration.
            </p>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 ">
                        {myParks &&
                            myParks.map((myPark) => (
                                <MyParkingDetail
                                    key={myPark._id}
                                    lot={myPark.lot}
                                    status={myPark.status}
                                    modifiedDate={myPark.updatedAt}
                                    buildingId={myPark.building_id}
                                    index={myPark._id}
                                    fetchMyParking={fetchAllMyParks}
                                />
                            ))}
                    </div>
                </div>
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default MyParking;
