import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParkLotContext } from "../hooks/useParkLotContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParkingRequestContext } from "../hooks/useParkingRequestContext";
import { useTaskContext } from "../hooks/useTaskContext";

//components
import ParkingLotDetailsRadio from "../components/ParkingLotDetailsRadio";
import Loader from "../components/Loader";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//sweet alerts
import Swal from "sweetalert2";

const ParkingSelect = () => {
    const location = useLocation();

    //loader
    const [loader, setLoader] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [buidlingImg, setBuildingImg] = useState("");

    //task context
    const { task_dispatch } = useTaskContext();

    //fetch number of tasks
    const numberOfTasks = async () => {
        setLoader(true);
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
            setLoader(false);
        }
    };

    //fetch all parking lots
    const fetchAllParking = async () => {
        setLoader(true);
        const response = await fetch(`/api/park/${building.id}`);
        const json = await response.json();

        if (response.ok) {
            park_dispatch({ type: "SET_PARKS", payload: json });
            setLoader(false);
        }
    };

    //get user context
    const { user } = useAuthContext();
    const { parks, park_dispatch } = useParkLotContext();
    const { parking_request_dispatch } = useParkingRequestContext();

    //accessing the state via location
    const { building, apartment, room, requestComment } = location.state;

    //states for select parking lots
    const [selectParkingLot, setSelectParkingLot] = useState({
        _id: "",
        number: "",
        status: "",
    });

    //fetch duplicate pending requests
    const fetchDuplicateParking = async () => {
        setLoader(true);
        const response = await fetch(
            `/api/park_request/duplicate/${user.email}`
        );
        const json = await response.json();

        if (response.ok) {
            setIsDuplicate(json);
            setLoader(false);
        }
    };

    //fetch the building
    const fetchBuildingImage = async () => {
        setLoader(true);
        const response = await fetch(`/api/building/${building.id}`);
        const json = await response.json();

        if (response.ok) {
            setBuildingImg(json[0].image);
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchAllParking();
        fetchDuplicateParking();
        fetchBuildingImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [park_dispatch, building]);

    //passes multiple values and set via the function
    const handleSelectChange = (_id, number, status) => {
        setSelectParkingLot({ _id, number, status });
    };

    const handleClick = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to reserve this parking!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoader(true);
                //selected parking lot details triggered
                console.log("request btn clicked");
                console.log(selectParkingLot.number);

                //parking request object
                const parkingRequest = {
                    user: user.email,
                    building: `${building.name} ${building.number}`,
                    apartment: apartment,
                    room: room,
                    parkingLot: selectParkingLot.number,
                    parkingLot_id: selectParkingLot._id,
                    status: "initiate",
                    comments: "",
                    requestComment: requestComment,
                };

                //this obj send to the api to create parking request
                const response = await fetch("/api/park_request/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(parkingRequest),
                });

                //patch request for the park lot (user, status change) here... (call by the parkingLot_id) - WHEN SELECTING A PARKING LOT IT BECOMES PENDING
                const parkLotUpdateResponse = await fetch(
                    `/api/park/${selectParkingLot._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            status: "pending",
                            user: user.email,
                        }),
                    }
                );

                if (parkLotUpdateResponse.ok) {
                    fetchAllParking();
                }

                const json = await response.json();

                if (response.ok) {
                    parking_request_dispatch({
                        type: "CREATE_PARKING_REQUEST",
                        payload: json,
                    });

                    toast.success(
                        "Parking reservation request sent successfully !",
                        {
                            position: "top-center",
                        }
                    );

                    numberOfTasks();
                    fetchDuplicateParking();
                }

                Swal.fire({
                    title: "Done!",
                    text: "Request sent.",
                    icon: "success",
                });
            }
        });

        //selected parking lot should be emended as pending
    };
    return (
        <div className="container other-form custom-from-center">
            <div className="row">
                <div className="col-md-8">
                    <h3 className="header mt-3 text-center">
                        Select a reservation
                    </h3>
                    {/* This you can access  Parking select Building{building.name} {building.number}, Apartment
            {apartment}, Room{room}*/}
                    <p className="paragraph text-justify">
                        As per your selection, you are looking for parking in{" "}
                        {building.name} {building.number}. Please note that
                        pending, maintenance, and reserved parking slots cannot
                        be reserved. You can only make a reservation for
                        available free slots. After you make a reservation, it
                        will require approval from the authorities, which may
                        take some time. Once a decision has been reached, we
                        will notify you via email at {user && user.email}.
                    </p>
                    {isDuplicate && (
                        <p className="paragraph text-center">
                            There is currently a pending parking request
                            associated with your email {user && user.email}. You
                            cannot submit a new request until the existing one
                            is resolved.
                        </p>
                    )}
                    <div className="container text-center mb-3">
                        <div
                            className="row row-cols-5 btn-group mt-3"
                            role="group"
                            aria-label="Basic radio toggle button group"
                        >
                            {parks &&
                                parks.map((parkingLot, i) => (
                                    <ParkingLotDetailsRadio
                                        key={parkingLot._id}
                                        lot={parkingLot.lot}
                                        status={parkingLot.status}
                                        i={i}
                                        disable={
                                            parkingLot.status === "pending" ||
                                            (parkingLot.status === "assign" &&
                                                true) // radio button disable according to the status of the parking lot
                                        }
                                        onSelect={() =>
                                            handleSelectChange(
                                                parkingLot._id,
                                                parkingLot.lot,
                                                parkingLot.status
                                            )
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary custom-btn"
                            onClick={handleClick}
                            disabled={!selectParkingLot._id || isDuplicate} //button get activated once the selection has been made
                        >
                            Request for parking
                        </button>
                    </div>

                    {loader && <Loader />}
                    <ToastContainer />
                </div>
                {/* Right side for image */}
                <div className="col-md-4 text-center d-flex align-items-center justify-content-center">
                    <img
                        src={
                            buidlingImg
                                ? buidlingImg
                                : "https://via.placeholder.com/300"
                        }
                        alt="Parking illustration"
                        className="img-fluid custom-img"
                        style={{ width: "300px", height: "300px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ParkingSelect;
