import React, { useState } from "react";
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
const CreateParkingForm = ({ building_id, selectParkingLot = null }) => {
    const { park_dispatch } = useParkLotContext();

    //state
    const [lot, setLot] = useState("");

    const [loader, setLoader] = useState(false);

    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([]);

    // State to handle accordion toggle
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    //parking lot status
    const [parkingLotStatus, setParkingLotStatus] = useState(null);

    //email for the manual assignment
    const [email, setEmail] = useState("");

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
                <form onSubmit={handleSubmit} className="other-form">
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
                                value={
                                    selectParkingLot && selectParkingLot._id
                                        ? selectParkingLot.number
                                        : lot
                                }
                                onChange={(e) => setLot(e.target.value)}
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
                            >
                                <option value="">Change status</option>
                                <option value="assign">Assign manually</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
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
                                        type="email"
                                        className={
                                            emptyField
                                                ? emptyField.includes("lot")
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                                : "form-control"
                                        }
                                        value={
                                            selectParkingLot &&
                                            selectParkingLot.user
                                                ? selectParkingLot.user
                                                : email
                                        }
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
