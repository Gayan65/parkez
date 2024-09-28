import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParkingUnassignRequestContext } from "../hooks/useParkingUnassignRequestContext";
import { useTaskContext } from "../hooks/useTaskContext";

const MyParkingDetail = ({
    lot,
    status,
    modifiedDate,
    buildingId,
    index,
    fetchMyParking,
}) => {
    //set building state
    const [building, setBuilding] = useState("");
    const [apartment, setApartment] = useState("");
    const [room, setRoom] = useState("");
    const [requestComment, setRequestComment] = useState("");

    const { user } = useAuthContext();
    const { parking_unassign_request_dispatch } =
        useParkingUnassignRequestContext();

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

    const handleSubmit = async (
        buildingName,
        buildingNUmber,
        apartment,
        room,
        parkingLot,
        parkingLot_id,
        requestComment
    ) => {
        //parking unassigned object here..
        const unassignedRequest = {
            user: user.email,
            building: buildingName + buildingNUmber,
            apartment: apartment,
            room: room,
            parkingLot: parkingLot,
            parkingLot_id: parkingLot_id,
            status: "initiate",
            comments: "",
            requestComment: requestComment,
        };

        //this obj send to the api to create parking unassign request
        const response = await fetch("/api/park_unassign_request/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(unassignedRequest),
        });

        const json = await response.json();

        if (response.ok) {
            parking_unassign_request_dispatch({
                type: "CREATE_PARKING_UNASSIGN_REQUEST",
                payload: json,
            });

            //calling to make the total tasks
            numberOfTasks();
        }

        console.log("successfully send the request");

        //parking lot status make as pending here..

        //patch request for the park lot (user, status change) here... (call by the parkingLot_id) - WHEN SELECTING A PARKING LOT IT BECOMES PENDING
        const parkLotUpdateResponse = await fetch(
            `/api/park/${parkingLot_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "pending" }),
            }
        );

        if (parkLotUpdateResponse.ok) {
            //calling the fetch function again once the parking lot status get pending
            fetchMyParking();
        }
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
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit(
                                            building[0].name,
                                            building[0].number,
                                            apartment,
                                            room,
                                            lot,
                                            index,
                                            requestComment
                                        );
                                    }}
                                >
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Add your apartment number
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="apartment number"
                                            required
                                            value={apartment}
                                            onChange={(e) =>
                                                setApartment(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Add your room number (if any)
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="room number"
                                            value={room}
                                            onChange={(e) =>
                                                setRoom(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Add your request, if you have a
                                            parking already
                                        </label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            onChange={(e) =>
                                                setRequestComment(
                                                    e.target.value
                                                )
                                            }
                                            value={requestComment}
                                        ></textarea>
                                    </div>

                                    <button
                                        className="btn btn-danger"
                                        disabled={status === "pending" && true}
                                    >
                                        Unassigned Request
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyParkingDetail;

//need to add to become freeze once the parking get pending once requested to for an unassign.
