import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBuildingsContext } from "../hooks/useBuildingsContext";

const HomeUserForm = () => {
    const { buildings, dispatch } = useBuildingsContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllBuildings = async () => {
            // api call to fetch all buildings
            const response = await fetch("/api/building");

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_BUILDINGS", payload: json });
            }
        };

        fetchAllBuildings();
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        //the data will be set via the form elements
        navigate("/parking_view", { state: "data" });
    };

    return (
        <div className=" container ">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Select your location </label>
                    <select className="form-select" required>
                        <option value="">Select your locality</option>
                        {buildings &&
                            buildings.map((building) => (
                                <option value={building._id} key={building._id}>
                                    {building.name} {building.number}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Add your apartment number
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="apartment number"
                        required
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
                    />
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                        Look for available slots
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HomeUserForm;
