import React, { useState } from "react";
import { useBuildingsContext } from "../hooks/useBuildingsContext";
import Loader from "./Loader";

const CreateBuildingForm = () => {
    const { dispatch } = useBuildingsContext();
    //set states

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");

    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([]);

    const [loader, setLoader] = useState(false);

    //form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        const building = { name, number, image, address };

        //API call to backend
        const response = await fetch("api/building/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(building),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            console.log(json);
            setEmptyField(json.emptyFields);
        }

        if (response.ok) {
            setName("");
            setNumber("");
            setImage("");
            setAddress("");
            setError(null);
            setEmptyField([]);

            console.log("Building added successfully!", json);
            dispatch({ type: "CREATE_BUILDINGS", payload: json });
        }

        setLoader(false);
    };
    return (
        <form className="other-form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label label">Name</label>
                <input
                    type="text"
                    className={
                        emptyField
                            ? emptyField.includes("name")
                                ? "form-control is-invalid"
                                : "form-control"
                            : "form-control"
                    }
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>

            <div className="mb-3">
                <label className="form-label label">Number</label>
                <input
                    type="number"
                    className={
                        emptyField
                            ? emptyField.includes("number")
                                ? "form-control is-invalid"
                                : "form-control"
                            : "form-control"
                    }
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                />
            </div>

            <div className="mb-3">
                <label className="form-label label">Address</label>
                <input
                    type="text"
                    className={
                        emptyField
                            ? emptyField.includes("address")
                                ? "form-control is-invalid"
                                : "form-control"
                            : "form-control"
                    }
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                />
            </div>

            <div className="mb-3">
                <label className="form-label label">Image</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                />
            </div>

            <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                    Create Building
                </button>
            </div>

            {error && <p className="error-forms">{error}</p>}
            {loader && <Loader />}
        </form>
    );
};

export default CreateBuildingForm;
