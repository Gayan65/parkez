import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const MyParkingDetail = ({ lot, status, modifiedDate, buildingId, index }) => {
    //set building state
    const [building, setBuilding] = useState("");

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchBuilding = async () => {
            //fetch building details from api
            const response = await fetch(`/api/building/${buildingId}`);
            const json = await response.json();

            if (response.ok) {
                setBuilding(json);
            }

            console.log(json);
        };

        fetchBuilding();
    }, [buildingId]);

    const handleClick = () => {
        console.log("unassigned click", user.email);

        //parking unassigned object here..

        //parking unassigned request here..
    };
    return (
        <div className="card mt-2">
            <div className="card-body">
                <h5 className="card-title">
                    {building && building[0].name}{" "}
                    {building && building[0].number}{" "}
                    {building && building[0].address}
                </h5>
                <p className="card-text">Parking Number: {lot}</p>
                <p className="card-text"> Parking Status: {status}</p>
                <p className="card-text"> Date assigned : {modifiedDate}</p>

                <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                >
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${index}`}
                                aria-expanded="false"
                                aria-controls={`${index}`}
                            >
                                Make an unassign request
                            </button>
                        </h2>
                        <div
                            id={`${index}`}
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className="accordion-body">
                                This may leads to cancel your current allocated
                                parks.
                                <button
                                    className="btn btn-danger"
                                    disabled={status === "pending" && true}
                                    onClick={handleClick}
                                >
                                    Unassigned Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyParkingDetail;

//need to add a form to add the relevant reasons for the unassign.
