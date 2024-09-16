import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const OTPsentForm = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);

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
    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join(""); // Combine OTP values into a single string
        console.log("Submitted OTP:", otpValue); // Log the OTP to the console
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
                    />
                ))}
            </div>
            <button type="submit" className="btn">
                Submit
            </button>
        </form>
    );
};

export default OTPsentForm;
