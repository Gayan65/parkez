import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import { useParkLotContext } from "../../hooks/useParkLotContext";

//icon
import { FaRegEdit } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";

//components
import BuildingViewCard from "../../components/BuildingViewCard";
import CreateParkingForm from "../../components/CreateParkingForm";
import ParkingLotDetails from "../../components/ParkingLotDetails";
import Loader from "../../components/Loader";

const BuildingDetails = () => {
    const [loader, setLoader] = useState(false);

    const { building, dispatch } = useBuildingsContext();
    const { parks, park_dispatch } = useParkLotContext();

    // State to handle accordion toggle
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    //get id from the params
    const { id } = useParams();

    useEffect(() => {
        //fetch the building here...
        const fetchBuilding = async () => {
            setLoader(true);
            const response = await fetch(`/api/building/${id}`);
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_A_BUILDING", payload: json });
            }

            setLoader(false);
        };

        // fetch the relevance parking lots for the above building here...
        const fetchAllParking = async () => {
            setLoader(true);
            const response = await fetch(`/api/park/${id}`);
            const json = await response.json();

            if (response.ok) {
                park_dispatch({ type: "SET_PARKS", payload: json });
            }
            setLoader(false);
        };

        fetchBuilding();
        fetchAllParking();
    }, [dispatch, park_dispatch, id]);

    // Function to toggle accordion
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const handleFileChange = () => {};

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
                {building &&
                    building[0] && ( //building[0] && this is solve the disappear of this component suddenly
                        <BuildingViewCard
                            name={building[0].name}
                            number={building[0].number}
                            address={building[0].address}
                            createdAt={building[0].createdAt}
                            image={building[0].image}
                        />
                    )}
                <button
                    className="btn-outline-primary edit-btn"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={toggleAccordion}
                >
                    <FaRegEdit size={20} className="me-1" /> Edit
                </button>
            </div>

            <div className={`accordion ${isAccordionOpen ? "open" : ""}`}>
                <h5 className="header">Edit Building Details</h5>
                <p className="paragraph" style={{ color: "#226699" }}>
                    You can edit the building's name, address, and other details
                    here.
                </p>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label label">
                            Building Name
                        </label>
                        <input
                            type="text"
                            placeholder="Building Name"
                            className="form-control mb-3"
                            value={building && building[0] && building[0].name}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label label">
                            Building Number
                        </label>
                        <input
                            type="number"
                            placeholder="Building Name"
                            className="form-control mb-3"
                            value={
                                building && building[0] && building[0].number
                            }
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        {" "}
                        <label className="form-label label">Address</label>
                        <input
                            type="text"
                            placeholder="Building Address"
                            className="form-control mb-3"
                            value={
                                building && building[0] && building[0].address
                            }
                        />
                    </div>
                    <div className="mb-3 custom-upload-wrapper">
                        <label className="form-label label">Image</label>
                        <input
                            type="file"
                            id="file-upload"
                            className="file-input"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        {/* Icon acting as the button to trigger file selection */}
                        <label
                            htmlFor="file-upload"
                            className="file-upload-label"
                        >
                            <IoCloudUploadOutline size={30} />{" "}
                            {/* Upload Icon */}
                        </label>
                    </div>
                </div>
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
            {loader && <Loader />}
        </div>
    );
};

export default BuildingDetails;
