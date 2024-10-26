import React, { useState } from "react";
import { useParkLotContext } from "../hooks/useParkLotContext";

const CreateParkingForm = ({ building_id }) => {
    const { park_dispatch } = useParkLotContext();

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

            park_dispatch({ type: "CREATE_PARK", payload: json });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="other-form">
                <div className="row-">
                    <div className="col-md-auto mb-3">
                        <label className="orm-label label">
                            Parking number
                        </label>
                    </div>
                    <div className="col-md-1 mb-3">
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

                    <div className="col-md-1 mb-3">
                        <input
                            type="submit"
                            className="btn btn-primary"
                            value={"Add"}
                        />
                    </div>
                </div>

                {error && <div>{error}</div>}
            </form>
        </div>
    );
};

export default CreateParkingForm;
