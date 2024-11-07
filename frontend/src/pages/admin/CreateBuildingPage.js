import React, { useEffect, useState } from "react";

//components
import CreateBuildingForm from "../../components/CreateBuildingForm";
import BuildingView from "../../components/BuildingView";

//custom hooks
import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import Loader from "../../components/Loader";

const CreateBuildingPage = () => {
    //set state
    const [loader, setLoader] = useState(false);
    const { buildings, dispatch } = useBuildingsContext();

    useEffect(() => {
        //api call to get all buildings
        const fetchBuildings = async () => {
            setLoader(true);
            const response = await fetch("/api/building/");
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_BUILDINGS", payload: json });
            }
            setLoader(false);
        };

        fetchBuildings();
    }, [dispatch]);

    return (
        <div className="container mt-3">
            <h3 className="header mb-2">
                Building Management and Parking Slot Allocation
            </h3>
            <p className="paragraph text-justify mb-5">
                In this section, administrators can efficiently manage parking
                facilities by adding new buildings and allocating parking slots
                to each designated location. By visiting each building, you can
                oversee the assignment of parking spaces, ensuring that all
                areas are equipped with the necessary resources for effective
                parking management. This feature simplifies the process of
                organizing parking availability, enhancing the overall
                functionality of our parking management system.
            </p>
            <div className="row">
                <div className="col-md-6">
                    <CreateBuildingForm />
                </div>
                <div className="col-md-6 custom-building-view-container">
                    {buildings &&
                        buildings.map((building) => (
                            <BuildingView
                                key={building._id}
                                _id={building._id}
                                name={building.name}
                                number={building.number}
                                address={building.address}
                                image={building.image}
                                link={`/building/${building._id}`}
                            />
                        ))}
                </div>
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default CreateBuildingPage;
