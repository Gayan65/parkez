import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcHome, FcExternal } from "react-icons/fc";
import { FaRegTrashCan } from "react-icons/fa6";

//context
import { useBuildingsContext } from "../hooks/useBuildingsContext";

//image
import no_image from "../assets/img/no_image.png";

const BuildingView = ({ _id, name, number, image, address, link }) => {
    //states
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);

    const { dispatch } = useBuildingsContext();

    const handleDelete = async (id) => {
        console.log("Delete Clicked", id);
        //api call here ..

        setLoader(true);
        const response = await fetch(`/api/building/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setLoader(false);
            setError(json.error);
        }

        if (response.ok) {
            setLoader(false);
            setError("");
            dispatch({ type: "DELETE_BUILDING", payload: json });
            console.log("deleted successfully!");
        }
    };

    return (
        <div className="row">
            <div className="col-md-10">
                <Link to={link} className="card-link-custom">
                    <div
                        className="card mb-3 container custom-card "
                        style={{ maxWidth: "400px" }}
                    >
                        <div className="row g-0">
                            <div className="col-md-6  d-flex align-items-center">
                                {/* add this img tag later  */}
                                <img
                                    src={image ? image : no_image}
                                    className="img-fluid rounded-start"
                                    alt="..."
                                    style={{ width: "195px", height: "110px" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title d-flex align-items-center">
                                        <FcHome size={20} className="me-1" />{" "}
                                        {name} {number}
                                    </h5>
                                    <p className="card-text d-flex align-items-center">
                                        <FcExternal
                                            color="#ffbd59"
                                            size={16}
                                            className="me-2"
                                        />
                                        {address}
                                    </p>
                                    <div className="view-link ">
                                        Click me for parking
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col-md-2 d-flex align-items-center">
                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(_id)}
                >
                    <FaRegTrashCan size={20} className="my-1" />
                </button>
            </div>
            <p className="error">{error && error}</p>
        </div>
    );
};

export default BuildingView;
