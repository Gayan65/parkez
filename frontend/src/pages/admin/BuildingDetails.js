import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import BuildingViewCard from "../../components/BuildingViewCard";

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
            {building && (
                <BuildingViewCard
                    name={building[0].name}
                    number={building[0].number}
                    address={building[0].address}
                />
            )}
        </div>
    );
};

export default BuildingDetails;
