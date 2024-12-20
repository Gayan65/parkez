import React, { useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";

const PendingUnassignRequestDetail = ({
    requestId,
    building,
    user,
    apartment,
    room,
    createdAt,
    requestComment,
    parkingLot,
    parkingLot_id,
    status,
    onStatusChange, //This function links with PendingRequest.js file. which has two parameters (id, status)
}) => {
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
                payload: {
                    totalTasks: json.totalTasks,
                    pendingTasks: json.pendingTasks,
                    pendingUnassignTasks: json.pendingUnassignTasks,
                },
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;

        //handle approve button
        if (action === "approve") {
            console.log("approve", comment);

            onStatusChange(
                requestId,
                "approved",
                comment,
                parkingLot_id,
                "active",
                "" //sending the blank user if it get approved
            );
            //calling to make the number of tasks
            numberOfTasks();
        }

        //handle decline button
        if (action === "decline") {
            console.log("decline", comment);
            onStatusChange(
                requestId,
                "decline",
                comment,
                parkingLot_id,
                "assign",
                user //sending the user if it get decline
            );
            //calling to make the number of tasks
            numberOfTasks();
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
