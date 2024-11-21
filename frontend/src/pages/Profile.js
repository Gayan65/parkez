import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

//sweet alert
import Swal from "sweetalert2";
import GeneralOTPSendForm from "../components/GenaralOTPSendForm";
import Loader from "../components/Loader";

const Profile = () => {
    //user
    const { user } = useAuthContext();

    //states
    const [isOtpRequested, setIsOtpRequested] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    //loader
    const [loader, setLoader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleOtpRequest = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn-outline-primary ms-2",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You need OTP to your email for changing your password",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, send",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    //set the otp request true
                    setIsOtpRequested(true);

                    setLoader(true);
                    //send the OTP api
                    const response = await fetch("/api/user/email_verify/", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: user.email }),
                    });

                    const json = await response.json();
                    console.log(json);

                    if (response.ok) {
                        setMessage(json.message);
                        setError("");
                        setLoader(false);

                        swalWithBootstrapButtons.fire({
                            title: "Sent!",
                            text: "Please check your email, OTP has been sent.",
                            icon: "success",
                        });
                    }

                    if (!response.ok) {
                        setLoader(false);
                        setError(json.error);
                        swalWithBootstrapButtons.fire({
                            title: "Not Sent!",
                            text: "OTP has not been sent, Please try again later",
                            icon: "error",
                        });
                    }
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "OTP has not been sent",
                        icon: "error",
                    });
                }
            });
    };
    return (
        <div className=" container ">
            <form onSubmit={handleSubmit} className="other-form">
                <h3 className="header mt-3">Change your password</h3>
                <p className="paragraph">
                    In this section, You can update your password. Before change
                    your password we need to verify your identity, therefore
                    please request an OTP to your email{" "}
                    <b>{user && user.email}</b>.
                </p>
                <button
                    className="btn-outline-primary mb-3"
                    onClick={handleOtpRequest}
                >
                    Request OTP
                </button>
            </form>

            {message && <p className="success-message"> {message} </p>}
            {error && <p className="error-message">{error}</p>}
            {isOtpRequested && <GeneralOTPSendForm email={user.email} />}
            {loader && <Loader />}
        </div>
    );
};

export default Profile;
