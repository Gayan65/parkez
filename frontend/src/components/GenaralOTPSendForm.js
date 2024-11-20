import React, { useState, useRef, useEffect } from "react";

//components
import Loader from "./Loader";

//sweet alerts
import Swal from "sweetalert2";
import PasswordEditForm from "./PasswordEditForm";

const GeneralOTPSendForm = ({ email }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [loader, setLoader] = useState(false);

    // Handle change event for OTP input
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Automatically move to the next input
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle backspace for deleting and moving focus
    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const otpValue = otp.join(""); // Combine OTP values into a single string
        console.log("Submitted OTP:", otpValue); // Log the OTP to the console

        const otpObj = {
            email: email,
            otp: otpValue,
        };

        //submit the otp for the api
        const response = await fetch("/api/user/otp_verify_no_deletion/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(otpObj),
        });

        const json = await response.json();
        console.log(json.message);

        if (response.ok) {
            setMessage(json.message);
            setError("");
            setSuccess(json.success);

            // swl alert fires here..
            Swal.fire({
                icon: "success",
                title: "Congratulations..",
                text: "Your OTP has been verified!",
            });
        }

        if (!response.ok) {
            setError(json.error);
        }

        setLoader(false);
    };

    // Effect to enable the submit button once all OTP inputs are filled
    useEffect(() => {
        const allFieldsFilled = otp.every((field) => field !== ""); // Check if all OTP fields are filled
        setIsSubmitEnabled(allFieldsFilled);
    }, [otp]); // This effect will run every time the OTP state changes

    return (
        <>
            <form onSubmit={handleSubmit} className="otp-form mt-3">
                <h4 className="header">Enter the 4-digit OTP</h4>
                <p className="paragraph">
                    Now the OTP has sent to your email, please check the email
                    and type the correct four digits, please note the the OTP
                    will be expired with in 10 miniutes.
                </p>
                <div className="otp-inputs">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="form-control otp-input"
                            disabled={success}
                        />
                    ))}
                    <button
                        type="submit"
                        className="btn"
                        style={{ width: "100px" }}
                        disabled={!isSubmitEnabled || success}
                    >
                        Submit
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message"> {message} </p>}
                {success && (
                    <div>
                        <h3>Congratulations!</h3>
                        <h3> Your OTP has been verified.</h3>
                    </div>
                )}
            </form>
            {loader && <Loader />}
            {success && <PasswordEditForm />}
        </>
    );
};

export default GeneralOTPSendForm;
