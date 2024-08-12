import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useBuildingsContext } from "../../hooks/useBuildingsContext";

//components
import BuildingViewCard from "../../components/BuildingViewCard";
import CreateParkingForm from "../../components/CreateParkingForm";

const BuildingDetails = () => {
    const { building, dispatch } = useBuildingsContext();

    //get id from the params
    const { id } = useParams();

    useEffect(() => {
        const fetchBuilding = async () => {
            const response = await fetch(`/api/building/${id}`);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_A_BUILDING", payload: json });
            }
        };

        fetchBuilding();
    }, [dispatch, id]);

    return (
        <div>
            <div>
                {building && (
                    <BuildingViewCard
                        name={building[0].name}
                        number={building[0].number}
                        address={building[0].address}
                    />
                )}
            </div>

            <div>
                <h3>Parking Slots</h3>
                <CreateParkingForm building_id={id} />
            </div>
        </div>
    );
};

export default BuildingDetails;
