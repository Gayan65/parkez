import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import { useParkLotContext } from "../../hooks/useParkLotContext";

//icon
import { FaRegEdit } from "react-icons/fa";

//components
import BuildingViewCard from "../../components/BuildingViewCard";
import CreateParkingForm from "../../components/CreateParkingForm";
import ParkingLotDetails from "../../components/ParkingLotDetails";

const BuildingDetails = () => {
    const { building, dispatch } = useBuildingsContext();
    const { parks, park_dispatch } = useParkLotContext();

    //get id from the params
    const { id } = useParams();

    useEffect(() => {
        //fetch the building here...
        const fetchBuilding = async () => {
            const response = await fetch(`/api/building/${id}`);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_A_BUILDING", payload: json });
            }
        };

        // fetch the relevance parking lots for the above building here...
        const fetchAllParking = async () => {
            const response = await fetch(`/api/park/${id}`);
            const json = await response.json();

            if (response.ok) {
                park_dispatch({ type: "SET_PARKS", payload: json });
            }
        };

        fetchBuilding();
        fetchAllParking();
    }, [dispatch, park_dispatch, id]);

    return (
        <div className="container mt-3">
            <h3 className="header mt-3">Building View</h3>
            <p className="paragraph">
                In this section, you can update building details, add or delete
                parking slots, and change the status of existing parking slots,
                such as marking a slot for maintenance. This ensures efficient
                management of parking availability while allowing for easy
                updates to building and parking information.
            </p>
            <div>
                {building && (
                    <BuildingViewCard
                        name={building[0].name}
                        number={building[0].number}
                        address={building[0].address}
                        createdAt={building[0].createdAt}
                        image={building[0].image}
                    />
                )}
                <button
                    className="btn-outline-primary"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <FaRegEdit size={20} className="me-1" /> Edit
                </button>
            </div>

            <div className="mt-5">
                <h3>Parking Slots</h3>
                <CreateParkingForm building_id={id} />
            </div>

            <div className="container text-center">
                <div className="row row-cols-3">
                    {parks &&
                        parks.map((parkingLot) => (
                            <ParkingLotDetails
                                key={parkingLot._id}
                                lot={parkingLot.lot}
                                status={parkingLot.status}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default BuildingDetails;
