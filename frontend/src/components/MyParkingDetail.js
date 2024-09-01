import React, { useEffect, useState } from "react";

const MyParkingDetail = ({ lot, status, modifiedDate, buildingId }) => {
    //set building state
    const [building, setBuilding] = useState("");

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
        console.log("unassigned click");
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

                <button
                    className="btn btn-danger"
                    disabled={status === "pending" && true}
                    onClick={handleClick}
                >
                    Unassigned Request
                </button>
            </div>
        </div>
    );
};

export default MyParkingDetail;

//need to add a form to add the relevant reasons for the unassign.
