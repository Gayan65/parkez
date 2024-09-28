import React, { useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";

const ParkingRequestDetail = ({
    email,
    building,
    apartment,
    room,
    parkingLot,
    parkingLot_id,
    requestId,
    requestedDate,
    requestComment,
    onStatusChange, //This function links with PendingRequest.js file. which has two parameters (id, status)
}) => {
    //Approving or Not approving comments
    const [comment, setComment] = useState("");

    //task count context
    const { task_dispatch } = useTaskContext();

    //fetch number of tasks
    const numberOfTasks = async () => {
        const response = await fetch("/api/tasks");
        const json = await response.json();

        if (response.ok) {
            task_dispatch({
                type: "CREATE_NUMBER_OF_TOTAL_TASKS",
                payload: json,
            });
        }
    };

    //Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(requestId);

        const action = e.nativeEvent.submitter.value;

        //handle approve button
        if (action === "approve") {
            console.log("approve", comment);
            onStatusChange(
                requestId,
                "approved",
                comment,
                parkingLot_id,
                "assign",
                email //sending the user if it get approved
            );

            //calling to make the number of tasks
            numberOfTasks();
        }

        //handle not approve button
        if (action === "decline") {
            console.log("decline", comment);
            onStatusChange(
                requestId,
                "declined",
                comment,
                parkingLot_id,
                "active",
                "" //sending blank user if it get declined
            );
            //calling to make the number of tasks
            numberOfTasks();
        }
    };

    return (
        <div className="card">
            <div className="card-header"> {building} </div>
            <div className="card-body">
                <h5 className="card-title"> {email} </h5>
                <p className="card-text">Apartment number {apartment}</p>
                <p className="card-text">Room number {room}</p>
                <p className="card-text">
                    Requested parking lot number {parkingLot}
                </p>
                <p className="card-text">parkingLot ID {parkingLot_id} </p>
                <p className="card-text">Requested Date {requestedDate} </p>
                <p className="card-text">Request comment {requestComment} </p>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="form-control"
                        rows="2"
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        value={"approve"}
                    >
                        Approve
                    </button>
                    <button
                        type="submit"
                        className="btn btn-secondary"
                        value={"decline"}
                    >
                        Decline
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ParkingRequestDetail;
