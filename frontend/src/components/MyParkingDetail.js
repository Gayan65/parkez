import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParkingUnassignRequestContext } from "../hooks/useParkingUnassignRequestContext";
import { useTaskContext } from "../hooks/useTaskContext";

//date format
import { format } from "date-fns";

// Loader component
import Loader from "./Loader";

//sweet alerts
import Swal from "sweetalert2";
import { fetchWrapper } from "../utils/fetchWrapper";

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
    const [loader, setLoader] = useState(false);

    // State to handle accordion toggle
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const { user } = useAuthContext();
    const { parking_unassign_request_dispatch } =
        useParkingUnassignRequestContext();

    //task count context
    const { task_dispatch } = useTaskContext();

    //fetch number of tasks
    const numberOfTasks = async () => {
        try {
            setLoader(true);
            const response = await fetchWrapper("/api/tasks", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error fetching buildings: ${response.status}`);
            }

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
        } catch (error) {
            console.error("Error in fetchBuildings:", error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                setLoader(true);
                //fetch building details from api
                const response = await fetchWrapper(
                    `/api/building/${buildingId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Error fetching buildings: ${response.status}`
                    );
                }
                const json = await response.json();

                if (response.ok) {
                    setBuilding(json);
                    setLoader(false);
                }
            } catch (error) {
                console.error("Error in fetchBuildings:", error);
            } finally {
                setLoader(false);
            }
        };

        //if user is there
        if (user) {
            fetchBuilding();
        }
    }, [buildingId, user]);

    const handleSubmit = async (
        buildingName,
        buildingNUmber,
        apartment,
        room,
        parkingLot,
        parkingLot_id,
        requestComment
    ) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to Unassign this parking, You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm!",
        }).then(async (result) => {
            if (result.isConfirmed) {
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

                try {
                    setLoader(true);

                    //this obj send to the api to create parking unassign request
                    const response = await fetchWrapper(
                        "/api/park_unassign_request/",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${user.token}`,
                            },
                            body: JSON.stringify(unassignedRequest),
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            `Error fetching buildings: ${response.status}`
                        );
                    }

                    const json = await response.json();

                    if (response.ok) {
                        parking_unassign_request_dispatch({
                            type: "CREATE_PARKING_UNASSIGN_REQUEST",
                            payload: json,
                        });
                        setLoader(false);
                        //calling to make the total tasks
                        if (user) {
                            numberOfTasks();
                        }
                    }

                    console.log("successfully send the request");

                    //parking lot status make as pending here..
                    setLoader(true);
                    //patch request for the park lot (user, status change) here... (call by the parkingLot_id) - WHEN SELECTING A PARKING LOT IT BECOMES PENDING
                    const parkLotUpdateResponse = await fetchWrapper(
                        `/api/park/${parkingLot_id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${user.token}`,
                            },
                            body: JSON.stringify({ status: "pending" }),
                        }
                    );

                    if (!parkLotUpdateResponse.ok) {
                        throw new Error(
                            `Error fetching buildings: ${response.status}`
                        );
                    }

                    if (parkLotUpdateResponse.ok) {
                        setLoader(false);
                        //calling the fetch function again once the parking lot status get pending
                        fetchMyParking();
                    }

                    Swal.fire({
                        title: "Sent!",
                        text: "Your request has been sent to administrator and wait for his approval.",
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Error in fetchBuildings:", error);
                } finally {
                    setLoader(false);
                }
            }
        });
    };

    // Function to toggle accordion
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };
    return (
        <div className="card-my-parking mt-2 ">
            <div className="card-my-parking-body">
                <div className="row g-0">
                    <div className="col-md-4  d-flex align-items-center">
                        <div className="parking-sign-container">
                            <div className="parking-sign">P-{lot}</div>
                            <div
                                className={
                                    status === "assign"
                                        ? "assigned-seal"
                                        : status === "pending"
                                        ? "pending-seal"
                                        : ""
                                }
                            >
                                {status === "assign" && "Assigned"}
                                {status === "pending" && "Approval Pending"}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7 ms-3">
                        <h3 className="my-parking-h1">
                            {building && building[0].name}{" "}
                            {building && building[0].number}{" "}
                        </h3>
                        <p className="my-parking-p">
                            {building && building[0].address}
                        </p>
                        <p className="my-parking-d">
                            Parking was assigned on{" "}
                            {format(
                                new Date(modifiedDate),
                                "EEEE, d/M/yyyy h:mma"
                            )}{" "}
                        </p>
                        <button
                            className="btn-outline-primary edit-btn"
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={toggleAccordion}
                        >
                            {!isAccordionOpen ? <>More</> : <>Close</>}
                        </button>
                    </div>
                </div>

                <div
                    className={`accordion-custom-my-parking ${
                        isAccordionOpen ? "open" : ""
                    }`}
                >
                    <div className="accordion-item">
                        <div className="paragraph" style={{ color: "#226699" }}>
                            This may leads to cancel your current allocated
                            parks.
                            <form
                                className="other-form"
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
                                        Add your request, if you have a parking
                                        already
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        onChange={(e) =>
                                            setRequestComment(e.target.value)
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
            {loader && <Loader />}
        </div>
    );
};

export default MyParkingDetail;

//need to add to become freeze once the parking get pending once requested to for an unassign.
