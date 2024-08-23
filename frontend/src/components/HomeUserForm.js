import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuildingsContext } from "../hooks/useBuildingsContext";

const HomeUserForm = () => {
  const { buildings, dispatch } = useBuildingsContext();

  //user form states
  const [building, setBuilding] = useState({ id: "", name: "", number: "" });
  const [apartment, setApartment] = useState("");
  const [room, setRoom] = useState("");
  const [requestComment, setRequestComment] = useState("");

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

  //splitting the parameters of the building object and passes multiple values and set via the function
  const handleSelectChange = (e) => {
    const [id, name, number] = e.target.value.split(",");
    setBuilding({ id, name, number });
  };

  //sending the data once the form get submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { building, apartment, room, requestComment };

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
            onChange={handleSelectChange}
          >
            <option value="">Select your locality</option>
            {buildings &&
              buildings.map((building) => (
                <option
                  //adding multiple values in the select option
                  value={`${building._id},${building.name},${building.number}`}
                  key={building._id}
                >
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
          <label className="form-label">
            Add your request, if you have a parking already
          </label>
          <textarea
            className="form-control"
            rows="2"
            onChange={(e) => setRequestComment(e.target.value)}
          ></textarea>
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
