import React, { useState } from "react";
import { useParkLotContext } from "../hooks/useParkLotContext";

const CreateParkingForm = ({ building_id }) => {
    const { dispatch } = useParkLotContext();

    //state
    const [lot, setLot] = useState("");

    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([]);

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

            dispatch({ type: "CREATE_PARK", payload: json });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Parking Lot Number</label>
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

                <div className="mb-3">
                    <input type="submit" className="btn btn-primary" />
                </div>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default CreateParkingForm;
