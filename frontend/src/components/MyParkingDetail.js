import React from "react";

const MyParkingDetail = ({ lot, status, modifiedDate }) => {
    return (
        <div className="card mt-2">
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                    <p> Parking Number: {lot} </p>
                    <p> Parking Status: {status} </p>
                    <p> Date assigned : {modifiedDate} </p>
                </p>
                <button className="btn btn-danger">Unassigned Request</button>
            </div>
        </div>
    );
};

export default MyParkingDetail;
