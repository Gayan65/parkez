import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBuildingsContext } from "../hooks/useBuildingsContext";
import { useTranslation } from "react-i18next";

//components
import Loader from "../components/Loader";

const HomeUserForm = () => {
    const [t] = useTranslation("homeuserform");

    const { buildings, dispatch } = useBuildingsContext();

    //user form states
    const [building, setBuilding] = useState({ id: "", name: "", number: "" });
    const [apartment, setApartment] = useState("");
    const [room, setRoom] = useState("");
    const [requestComment, setRequestComment] = useState("");
    const [loader, setLoader] = useState(false);

    //navigate to the parking selection page
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllBuildings = async () => {
            setLoader(true);
            // api call to fetch all buildings
            const response = await fetch("/api/building");

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_BUILDINGS", payload: json });
                setLoader(false);
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
        setLoader(true);

        const data = { building, apartment, room, requestComment };

        //the data will be set via the form elements
        navigate("/parking_view", { state: data });
        setLoader(false);
    };

    return (
        <div className=" container ">
            <form onSubmit={handleSubmit} className="other-form">
                <h3 className="header mt-3"> {t("header")} </h3>
                <p className="paragraph">{t("para")}</p>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label label">
                            {t("label.location")}
                        </label>
                        <select
                            className="form-select"
                            required
                            onChange={handleSelectChange}
                        >
                            <option value="">{t("text_field.location")}</option>
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

                    <div className="col-md-4 mb-3">
                        <label className="form-label label">
                            {t("label.apartment")}
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder={t("text_field.location")}
                            required
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="form-label label">
                            {t("label.room")}
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={t("text_field.location")}
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label label">
                        {t("label.comments")}
                    </label>
                    <textarea
                        className="form-control"
                        rows="4"
                        onChange={(e) => setRequestComment(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-5">
                    <button
                        type="submit"
                        className="btn btn-primary custom-btn"
                        disabled={!building.id || !apartment} //button activation changes according to the values
                    >
                        {t("button")}
                    </button>
                </div>
            </form>
            {loader && <Loader />}
        </div>
    );
};

export default HomeUserForm;
