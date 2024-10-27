import React, { useState } from "react";
import { useParkLotContext } from "../hooks/useParkLotContext";

//icon
import { FaRegWindowClose } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const CreateParkingForm = ({ building_id }) => {
    const { park_dispatch } = useParkLotContext();

    //state
    const [lot, setLot] = useState("");

    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([]);

    // State to handle accordion toggle
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parking = { lot, building_id, status: "active" };

        //API call to backend
        const response = await fetch("/api/park/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parking),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            console.log(json);
            setEmptyField(json.emptyFields);
        }

        if (response.ok) {
            setLot("");
            setError(null);
            setEmptyField([]);
            console.log("Parking added successfully!");

            park_dispatch({ type: "CREATE_PARK", payload: json });
        }
    };

    // Function to toggle accordion
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <div>
            <button
                className="btn-outline-primary edit-btn"
                style={{ display: "flex", alignItems: "center" }}
                onClick={toggleAccordion}
            >
                {!isAccordionOpen ? (
                    <>
                        <IoMdAdd size={20} className="me-1" /> Add Parking Space
                    </>
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
                                value={lot}
                                onChange={(e) => setLot(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <select className="form-select">
                                <option value="">Change status</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value={"Add"}
                            />
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default CreateParkingForm;
