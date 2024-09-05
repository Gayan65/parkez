import React, { useState } from "react";

const PendingUnassignRequestDetail = ({
    building,
    user,
    apartment,
    room,
    createdAt,
    requestComment,
    parkingLot,
    parkingLot_id,
    status,
}) => {
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;

        //handle approve button
        if (action === "approve") {
            console.log("approve", comment);
        }

        //handle decline button
        if (action === "decline") {
            console.log("decline", comment);
        }
    };
    return (
        <div className="card">
            <h5 className="card-header">{building}</h5>
            <div className="card-body">
                <h5 className="card-title"> {user} </h5>
                <p className="card-text">Apartment Number : {apartment}</p>
                <p className="card-text">Room Number : {room}</p>
                <p className="card-text">Initiated date : {createdAt}</p>
                <p className="card-text">Request : {requestComment}</p>
                <p className="card-text">Parking Lot Number: {parkingLot}</p>
                <p className="card-text">Parking lot id : {parkingLot_id}</p>
                <p className="card-text">Status : {status}</p>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="form-control"
                        rows="2"
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button className="btn btn-primary" value={"approve"}>
                        Approve
                    </button>
                    <button className="btn btn-danger" value={"decline"}>
                        Decline
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PendingUnassignRequestDetail;
