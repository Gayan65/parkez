import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcHome, FcExternal } from "react-icons/fc";
import { FaRegTrashCan } from "react-icons/fa6";
import { motion } from "framer-motion";

//context
import { useBuildingsContext } from "../hooks/useBuildingsContext";
import { useAuthContext } from "../hooks/useAuthContext";

//image
import no_image from "../assets/img/no_img_small.png";
import Loader from "./Loader";

//sweet alerts
import Swal from "sweetalert2";
import { fetchWrapper } from "../utils/fetchWrapper";

const BuildingView = ({ _id, name, number, image, address, link }) => {
    //states
    const [loader, setLoader] = useState(false);

    const { dispatch } = useBuildingsContext();
    const { user } = useAuthContext();

    const handleDelete = async (id) => {
        console.log("Delete Clicked", id);
        //api call here ..

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoader(true);
                try {
                    const response = await fetchWrapper(`/api/building/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${user.token}`,
                        },
                    });

                    const json = await response.json();

                    if (!response.ok) {
                        setLoader(false);
                        Swal.fire({
                            title: "Delete unsuccessful!",
                            text: "Your building has not been deleted, since it may have already allocated parkings.",
                            icon: "error",
                        });
                    }

                    if (response.ok) {
                        setLoader(false);
                        dispatch({ type: "DELETE_BUILDING", payload: json });
                        console.log("deleted successfully!");
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your building has been deleted.",
                            icon: "success",
                        });
                    }
                } catch (error) {
                    console.error("Error in fetchBuildings:", error);
                } finally {
                    setLoader(false);
                }
            }
        });
    };

    return (
        <div className="row">
            <div className="col-md-10">
                <Link to={link} className="card-link-custom">
                    <motion.div
                        className="card mb-3 container custom-card "
                        style={{ maxWidth: "400px" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
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
                    </motion.div>
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
            {loader && <Loader />}
        </div>
    );
};

export default BuildingView;
