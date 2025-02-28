import React, { useState, useEffect } from "react";
import { useParkLotContext } from "../hooks/useParkLotContext";
import { useAuthContext } from "../hooks/useAuthContext";

//icon
import { FaRegWindowClose, FaRegEdit, FaParking } from "react-icons/fa";
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
    const userAuth = useAuthContext().user;

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
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userAuth.token}`,
            },
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

        if (parkingLotStatus === "assign" && !email) {
            setError("Email is required for manual assignment.");
            return; // Prevent submission if email is empty for 'assign' status
        }

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
                    user: parkingLotStatus === "assign" ? email : "",
                };

                setLoader(true);
                const response = await fetch(
                    `/api/park/${selectParkingLot._id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userAuth.token}`,
                        },
                        body: JSON.stringify(updatedParking),
                    }
                );

                const json = await response.json();

                setLoader(false);

                if (!response.ok) {
                    setError(json.error);
                    console.log(json);
                } else {
                    setError(null);
                    console.log(
                        "Parking updated successfully!",
                        updatedParking
                    );
                    park_dispatch({ type: "UPDATE_PARK", payload: json });
                    if (onUpdateSuccess) onUpdateSuccess(); // Refresh data after update
                    Swal.fire({
                        title: "Updated!",
                        text: "Changes have been updated!",
                        icon: "success",
                    });
                }
            }
        });
    };

    const handleDelete = async (e) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoader(true);
                const response = await fetch(
                    `/api/park/${selectParkingLot._id}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${userAuth.token}`,
                        },
                    }
                );

                const json = await response.json();

                if (!response.ok) {
                    setLoader(false);
                    setError(json.error);
                }

                if (response.ok) {
                    setLoader(false);
                    setError("");
                    park_dispatch({ type: "DELETE_PARK", payload: json });
                    console.log("deleted successfully!");
                }

                Swal.fire({
                    title: "Deleted!",
                    text: "Parking lot has been deleted.",
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
                <h5 className="header">
                    {selectParkingLot && selectParkingLot._id
                        ? "Edit Parking"
                        : "Add Parking"}
                </h5>
                <p className="paragraph" style={{ color: "#226699" }}>
                    {selectParkingLot && selectParkingLot._id
                        ? "You can edit the parking lots such as classifying as maintenance, changed ownership and etc"
                        : "Add parking spaces for this building using the form below."}
                </p>
                <form
                    onSubmit={
                        selectParkingLot && selectParkingLot._id
                            ? handleUpdateSubmit
                            : handleSubmit
                    }
                    className="other-form"
                >
                    <label className="orm-label label d-flex align-items-center">
                        {" "}
                        <FaParking className="me-1" size={25} />
                        Parking number
                    </label>
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
                            <div className="d-flex">
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
                                <input
                                    disabled={
                                        selectParkingLot &&
                                        selectParkingLot.status === "active"
                                            ? false
                                            : true
                                    }
                                    className="btn btn-danger ms-3"
                                    value={"Delete"}
                                    onClick={handleDelete}
                                />
                            </div>
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
