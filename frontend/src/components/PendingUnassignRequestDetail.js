import React from "react";

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
                <button className="btn btn-primary">Approve</button>
                <button className="btn btn-danger">Decline</button>
            </div>
        </div>
    );
};

export default PendingUnassignRequestDetail;
