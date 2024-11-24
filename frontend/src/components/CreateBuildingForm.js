import React, { useState } from "react";
import { useBuildingsContext } from "../hooks/useBuildingsContext";

//components
import Loader from "./Loader";

//icons
import { IoCloudUploadOutline, IoCloseCircle } from "react-icons/io5";

//sweet alerts
import Swal from "sweetalert2";

const CreateBuildingForm = () => {
    const { dispatch } = useBuildingsContext();
    //set states

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [imgFile, setImgFile] = useState("");

    const [error, setError] = useState(null);
    const [emptyField, setEmptyField] = useState([]);

    const [loader, setLoader] = useState(false);

    //file handler
    const handleFileChange = async (e) => {
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
        setImage(null);
        setImgFile(null); // Reset the file
    };

    //form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);

        const building = {
            name,
            number,
            image,
            imgFile: imgFile ? imgFile.name : "",
            address,
        };

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
            Swal.fire({
                title: "Building creation failed",
                text: "The building could not be created. Some fields might be empty, please review your data and try again.",
                icon: "error",
            });
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

            Swal.fire({
                title: "Building Created",
                text: "The building has been successfully created. Please check the list on your right and ensure you add the corresponding parking spaces.",
                icon: "success",
            });
        }

        setLoader(false);
    };
    return (
        <form className="other-form" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label label">Building Name</label>
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
                    placeholder="Enter building name. Ex: MOAS"
                />
            </div>

            <div className="mb-3">
                <label className="form-label label">Building Number</label>
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
                    placeholder="Enter building number. Ex: 5"
                />
            </div>

            <div className="mb-3">
                <label className="form-label label">Building Address</label>
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
                    placeholder="Enter building location / address. Ex: Raviradantie 7"
                />
            </div>

            <div className="mb-3 custom-upload-wrapper">
                <label className="form-label label">Image</label>
                <input
                    type="file"
                    id="file-upload"
                    className="file-input"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {/* Icon acting as the button to trigger file selection */}
                <label htmlFor="file-upload" className="file-upload-label">
                    <IoCloudUploadOutline size={30} /> {/* Upload Icon */}
                </label>

                {image && (
                    <div className="file-info">
                        <p className="file-name form-label label">
                            {imgFile.name}
                        </p>
                        {/* Close button to remove the file */}
                        <button className="remove-btn" onClick={removeFile}>
                            <IoCloseCircle size={23} /> {/* Close icon */}
                        </button>
                    </div>
                )}
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
