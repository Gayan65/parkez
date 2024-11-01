import React, { useState, useEffect } from "react";
import { useParkLotContext } from "../hooks/useParkLotContext";

//icon
import { FaRegWindowClose, FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

//components
import Loader from "./Loader";

//import alerts
import Swal from "sweetalert2";

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//once the update feature activated the selectParkingLot activated
const CreateParkingForm = ({
    building_id,
    selectParkingLot = null,
    onUpdateSuccess,
}) => {
    const { park_dispatch } = useParkLotContext();

    //state
    const [lot, setLot] = useState("");

    const [loader, setLoader] = useState(false);

    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([]);

    // State to handle accordion toggle
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    //parking lot status
    const [parkingLotStatus, setParkingLotStatus] = useState("");

    //email for the manual assignment
    const [email, setEmail] = useState("");
    // Load data into state if editing an existing parking lot
    useEffect(() => {
        if (selectParkingLot) {
            setLot(selectParkingLot.number || "");
            setEmail(selectParkingLot.user || "");
            setParkingLotStatus(selectParkingLot.status || "active");
        }
    }, [selectParkingLot]);

    const isFormModified = () => {
        return (
            lot !== selectParkingLot?.number ||
            email !== selectParkingLot?.user ||
            parkingLotStatus !== selectParkingLot?.status
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parking = { lot, building_id, status: "active" };

        setLoader(true);

        //API call to backend
        const response = await fetch("/api/park/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parking),
        });

        const json = await response.json();

        setLoader(false);

        if (!response.ok) {
            Swal.fire({
                title: "Parking added unsuccessful!",
                text: "Check the values you entered",
                icon: "error",
            });
            setError(json.error);
            console.log(json);
            setEmptyField(json.emptyFields);
        }

        if (response.ok) {
            setLot("");
            setError(null);
            setEmptyField([]);
            console.log("Parking added successfully!");
            toast.success("Parking added successfully !", {
                position: "top-center",
            });

            park_dispatch({ type: "CREATE_PARK", payload: json });
        }
    };

    // Function to toggle accordion
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    console.log(selectParkingLot);

    const handleSelectChange = (e) => {
        setParkingLotStatus(e.target.value);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!, Do you really want to save the changes?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Save changes!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedParking = {
                    lot: lot || selectParkingLot.number,
                    status: parkingLotStatus,
                    user:
                        parkingLotStatus === "maintenance"
                            ? ""
                            : email || parkingLotStatus === "active"
                            ? ""
                            : email,
                };

                setLoader(true);
                const response = await fetch(
                    `/api/park/${selectParkingLot._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedParking),
                    }
                );

                const json = await response.json();

                if (!response.ok) {
                    setError(json.error);
                    console.log(json);
                    setLoader(false);
                }

                if (response.ok) {
                    setError(null);

                    console.log("Parking updated successfully!");

                    park_dispatch({ type: "UPDATE_PARK", payload: json });
                    // Trigger fetchAllParking after successful update
                    if (onUpdateSuccess) onUpdateSuccess();
                    setLoader(false);
                }

                Swal.fire({
                    title: "Updated!",
                    text: "Changes have been updated!.",
                    icon: "success",
                });
            }
        });
    };
    return (
        <div>
            <button
                className="btn-outline-primary edit-btn"
                style={{ display: "flex", alignItems: "center" }}
                onClick={toggleAccordion}
            >
                {!isAccordionOpen ? (
                    selectParkingLot && selectParkingLot._id ? (
                        <>
                            {" "}
                            <FaRegEdit size={20} className="me-1" /> Edit
                        </>
                    ) : (
                        <>
                            <IoMdAdd size={20} className="me-1" /> Add Parking
                            Space
                        </>
                    )
                ) : (
                    <>
                        <FaRegWindowClose size={20} className="me-1" /> Close
                    </>
                )}
            </button>

            <div
                className={`accordion-custom ${isAccordionOpen ? "open" : ""}`}
            >
                <h5 className="header">Add Parking</h5>
                <p className="paragraph" style={{ color: "#226699" }}>
                    Add parking spaces for this building using the form below.
                </p>
                <form
                    onSubmit={
                        selectParkingLot && selectParkingLot._id
                            ? handleUpdateSubmit
                            : handleSubmit
                    }
                    className="other-form"
                >
                    <label className="orm-label label">Parking number</label>
                    <div className="row mt-3">
                        <div className="col-md-4 mb-3">
                            <input
                                type="number"
                                className={
                                    emptyField
                                        ? emptyField.includes("lot")
                                            ? "form-control is-invalid"
                                            : "form-control"
                                        : "form-control"
                                }
                                value={lot}
                                onChange={(e) => setLot(e.target.value)}
                                disabled={
                                    selectParkingLot &&
                                    selectParkingLot._id &&
                                    true
                                }
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <select
                                className="form-select"
                                disabled={
                                    selectParkingLot && selectParkingLot._id
                                        ? false
                                        : true
                                }
                                onChange={handleSelectChange}
                                value={parkingLotStatus}
                            >
                                <option value="active">Make available</option>
                                <option value="assign">Assign manually</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                disabled={
                                    selectParkingLot && selectParkingLot._id
                                        ? !isFormModified()
                                        : false || lot
                                        ? false
                                        : true
                                }
                                type="submit"
                                className="btn btn-primary"
                                value={
                                    selectParkingLot && selectParkingLot._id
                                        ? "Save changes"
                                        : "Add"
                                }
                            />
                        </div>
                    </div>
                    {parkingLotStatus === "assign" && (
                        <div>
                            <label className="orm-label label">
                                Add email for manual assignment
                            </label>
                            <div className="row mt-3">
                                <div className="col-md-4 mb-3">
                                    <input
                                        required
                                        type="email"
                                        className={
                                            emptyField
                                                ? emptyField.includes("lot")
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                                : "form-control"
                                        }
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
            {loader && <Loader />}
            <ToastContainer />
        </div>
    );
};

export default CreateParkingForm;
