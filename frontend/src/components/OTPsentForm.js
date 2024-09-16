import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const OTPsentForm = ({ email }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
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
        const otpValue = otp.join(""); // Combine OTP values into a single string
        console.log("Submitted OTP:", otpValue); // Log the OTP to the console

        const otpObj = {
            email: email,
            otp: otpValue,
        };

        //submit the otp for the api
        const response = await fetch("/api/user/otp_verify/", {
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
        }

        if (!response.ok) {
            setError(json.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="otp-form other-form">
            <h3>Enter the 4-digit OTP</h3>
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
            </div>
            <button type="submit" className="btn" disabled={success}>
                Submit
            </button>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message"> {message} </p>}
            {success && (
                <div>
                    <h3>Congratulations!</h3>
                    <h3> Your password has been reset.</h3>
                    <Link className="link-contact" to={"/signup"}>
                        Recreate Password
                    </Link>
                </div>
            )}
        </form>
    );
};

export default OTPsentForm;
