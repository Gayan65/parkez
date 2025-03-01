import React, { useState } from "react";
import { useTaskContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

//date format
import { format } from "date-fns";

const PendingUnassignRequestDetail = ({
    requestId,
    building,
    userReq,
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
    const { user } = useAuthContext();

    //fetch number of tasks
    const numberOfTasks = async () => {
        const response = await fetch("/api/tasks", {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
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
                userReq //sending the user if it get decline
            );
            //calling to make the number of tasks
            numberOfTasks();
        }
    };
    return (
        <div className="card-custom">
            <div className="card-header-custom">{building}</div>
            <p className="card-text-custom date-custom">
                {format(new Date(createdAt), "EEEE, d/M/yyyy h:mma")}
            </p>
            <div className="card-body-custom">
                <h5 className="card-title-custom "> {userReq} </h5>
                <table className="table-custom">
                    <tbody>
                        <tr>
                            <td className="custom-td">Apartment Number</td>
                            <td>{apartment}</td>
                        </tr>

                        <tr>
                            <td className="custom-td">Room Number</td>
                            <td>{room}</td>
                        </tr>

                        <tr>
                            <td className="custom-td">Parking Number</td>
                            <td>{parkingLot}</td>
                        </tr>

                        <tr>
                            <td className="custom-td">Client Request</td>
                            <td>{requestComment}</td>
                        </tr>
                    </tbody>
                </table>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="form-control"
                        rows="2"
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button
                        className="btn-custom-request btn-primary-custom"
                        value={"approve"}
                    >
                        Approve
                    </button>
                    <button
                        className="btn-custom-request btn-secondary-custom"
                        value={"decline"}
                    >
                        Decline
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PendingUnassignRequestDetail;
