import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBuildingsContext } from "../../hooks/useBuildingsContext";
import { useParkLotContext } from "../../hooks/useParkLotContext";

//icon
import { FaRegEdit, FaRegWindowClose } from "react-icons/fa";
import { IoCloudUploadOutline, IoCloseCircle } from "react-icons/io5";

//components
import BuildingViewCard from "../../components/BuildingViewCard";
import CreateParkingForm from "../../components/CreateParkingForm";
import ParkingLotDetails from "../../components/ParkingLotDetails";
import Loader from "../../components/Loader";

//sweet alerts
import Swal from "sweetalert2";

const BuildingDetails = () => {
    const [loader, setLoader] = useState(false);

    const { building, dispatch } = useBuildingsContext();
    const { parks, park_dispatch } = useParkLotContext();

    // State to handle accordion toggle
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [imgFile, setImgFile] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);

    //get id from the params
    const { id } = useParams();

    //fetch the building here...
    const fetchBuilding = async (id) => {
        setLoader(true);
        const response = await fetch(`/api/building/${id}`);
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "SET_A_BUILDING", payload: json });
            // Set local state values once the building is fetched

            setName(json[0].name);
            setNumber(json[0].number);
            setAddress(json[0].address);
            setImgFile(json[0].imgFile);
            setImage(json[0].image);

            setImageChanged(false); //this will make the imageChange in to false and the imgFile DB string can display to the user
        }

        setLoader(false);
    };

    useEffect(() => {
        if (id) {
            //building[0] && this is solve the disappear of this component suddenly

            // fetch the relevance parking lots for the above building here...
            const fetchAllParking = async () => {
                setLoader(true);
                const response = await fetch(`/api/park/${id}`);
                const json = await response.json();

                if (response.ok) {
                    park_dispatch({ type: "SET_PARKS", payload: json });
                }
                setLoader(false);
            };
            fetchBuilding(id);
            fetchAllParking();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, park_dispatch, id]);

    // Function to toggle accordion
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    console.log("IMG File from Page loaded", imgFile, imageChanged);

    const handleFileChange = async (e) => {
        console.log("it get changed");
        setImageChanged(true);
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type; // Get file MIME type

            // Check if the file is an image (MIME type starts with 'image/')
            if (!fileType.startsWith("image/")) {
                setError(
                    "Please upload a valid image file (jpg, png, gif, etc.)."
                );
                setImage(null); // Reset the file

                Swal.fire({
                    title: "File can't upload",
                    text: "Please upload a valid image file (jpg, png, gif, etc.).",
                    icon: "error",
                });

                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                setError("Please upload a file smaller than 10MB.");
                setImage(null); // Reset the file
                Swal.fire({
                    title: "File too large",
                    text: "Please upload a file smaller than 10MB.",
                    icon: "error",
                });

                return;
            }

            // Clear the error if the file is valid
            setError(null);
            //call the function to set the file to base image
            const base64 = await convertToBase64(file);
            setImage(base64);
            setImgFile(file);
            console.log(file.size);
        }
    };

    const removeFile = () => {
        setImageChanged(true);
        setImage(null);
        setImgFile(null); // Reset the file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);

        const updatedBuilding = {
            name,
            number,
            image,
            imgFile: imgFile ? imgFile.name : "",
            address,
        };

        const response = await fetch(`/api/building/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBuilding),
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            console.log(json);
        }

        if (response.ok) {
            setError(null);

            // Re-fetch the updated building after submitting the form
            fetchBuilding(id);

            console.log("Building updated successfully!");
            console.log("IMG File from handle submit", imgFile, imageChanged);
            dispatch({ type: "SET_A_BUILDING", payload: json });
            setLoader(false);
        }
    };

    return (
        <div className="container mt-3">
            <h3 className="header mt-3">Building View</h3>
            <p className="paragraph">
                In this section, you can update building details, add or delete
                parking slots, and change the status of existing parking slots,
                such as marking a slot for maintenance. This ensures efficient
                management of parking availability while allowing for easy
                updates to building and parking information.
            </p>
            <div>
                {building &&
                    building[0] && ( //building[0] && this is solve the disappear of this component suddenly
                        <BuildingViewCard
                            name={building[0].name}
                            number={building[0].number}
                            address={building[0].address}
                            createdAt={building[0].createdAt}
                            image={building[0].image}
                        />
                    )}
                <button
                    className="btn-outline-primary edit-btn"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={toggleAccordion}
                >
                    {!isAccordionOpen ? (
                        <>
                            <FaRegEdit size={20} className="me-1" /> Edit
                        </>
                    ) : (
                        <>
                            <FaRegWindowClose size={20} className="me-1" />{" "}
                            Close
                        </>
                    )}
                </button>
            </div>

            <div
                className={`accordion-custom ${isAccordionOpen ? "open" : ""}`}
            >
                <h5 className="header">Edit Building Details</h5>
                <p className="paragraph" style={{ color: "#226699" }}>
                    You can edit the building's name, address, and other details
                    here.
                </p>
                <form className="other-form" onSubmit={handleSubmit}>
                    {" "}
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label label">
                                Building Name
                            </label>
                            <input
                                type="text"
                                placeholder="Building Name"
                                className="form-control mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label label">
                                Building Number
                            </label>
                            <input
                                type="number"
                                placeholder="Building Name"
                                className="form-control mb-3"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            {" "}
                            <label className="form-label label">Address</label>
                            <input
                                type="text"
                                placeholder="Building Address"
                                className="form-control mb-3"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="Save Changes"
                                />
                            </div>

                            <div className="col-md-4 mb-3 custom-upload-wrapper">
                                <label className="form-label label">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="file-input"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                {/* Icon acting as the button to trigger file selection */}
                                <label
                                    htmlFor="file-upload"
                                    className="file-upload-label"
                                >
                                    <IoCloudUploadOutline size={30} />{" "}
                                    {/* Upload Icon */}
                                </label>

                                {imgFile && (
                                    <div className="file-info">
                                        <p className="file-name form-label label">
                                            {imageChanged
                                                ? imgFile.name
                                                : imgFile}{" "}
                                            {/* imgFile has a name string originally but it get changed as a file handled */}
                                        </p>
                                        {/* Close button to remove the file */}

                                        <button
                                            className="remove-btn"
                                            onClick={removeFile}
                                        >
                                            <IoCloseCircle size={23} />{" "}
                                            {/* Close icon */}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {error && <p className="error-forms">{error}</p>}
                </form>
            </div>

            <div className="mt-5">
                <h3>Parking Slots</h3>
                <CreateParkingForm building_id={id} />
            </div>

            <div className="container text-center">
                <div className="row row-cols-3">
                    {parks &&
                        parks.map((parkingLot) => (
                            <ParkingLotDetails
                                key={parkingLot._id}
                                lot={parkingLot.lot}
                                status={parkingLot.status}
                            />
                        ))}
                </div>
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default BuildingDetails;

//converting image file to Base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
}
