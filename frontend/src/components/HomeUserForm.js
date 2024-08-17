import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuildingsContext } from "../hooks/useBuildingsContext";

const HomeUserForm = () => {
  const { buildings, dispatch } = useBuildingsContext();

  //user form states
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [room, setRoom] = useState("");

  //navigate to the parking selection page
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

    const data = { building, apartment, room };

    //the data will be set via the form elements
    navigate("/parking_view", { state: data });
  };

  return (
    <div className=" container ">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select your location </label>
          <select
            className="form-select"
            required
            onChange={(e) => setBuilding(e.target.value)}
          >
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
          <label className="form-label">Add your apartment number</label>
          <input
            type="number"
            className="form-control"
            placeholder="apartment number"
            required
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Add your room number (if any)</label>
          <input
            type="number"
            className="form-control"
            placeholder="room number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
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
