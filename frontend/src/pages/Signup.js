import React, { useState, useRef } from "react";
import { useSignup } from "../hooks/useSignup";
import { useTranslation } from "react-i18next";

//sweet alerts
import Swal from "sweetalert2";
import GeneralOTPSendForm from "../components/GenaralOTPSendForm";

const Signup = () => {
    const [t] = useTranslation("signup");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRe_password] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isOTPVerified, setIsOTPVerified] = useState(false);

    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);
    const [success, setSuccess] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loader, setLoader] = useState(false);

    const { signup, loading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if OTP verified the user creation should be enabled
        //API call for OTP verification process
        const otpValue = otp.join("");
        console.log("Submitted OTP:", otpValue);

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
            setErrorMsg("");
            setSuccess(json.success);
            setIsOTPVerified(true);

            // swl alert fires here..
            Swal.fire({
                icon: "success",
                title: "Congratulations..",
                text: "Your OTP has been verified!",
            });

            //call the signup function to create the user and navigate to the home page
            await signup(email, password, re_password);
        }

        if (!response.ok) {
            setErrorMsg(json.error);
        }
        //call the signup function

        setEmail("");
        setPassword("");
        setRe_password("");
    };

    const handleVerify = async (e) => {
        e.preventDefault(); // Prevent form submission
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn-outline-primary ms-2",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
        const emailInput =
            e.target.previousElementSibling.querySelector("input"); // Get the email input
        if (!emailInput.checkValidity()) {
            // If email is invalid, show an alert or return
            Swal.fire({
                icon: "error",
                title: t("fire.title"),
                text: t("fire.text"),
            });
            return;
        }

        // If the email is valid, proceed with your logic
        console.log("Verify clicked for email:", email);
        setLoader(true);
        const response = await fetch("/api/user/email_verify_signup/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email }),
        });

        const json = await response.json();
        console.log(json);

        if (response.ok) {
            setMessage(json.message);
            setErrorMsg("");
            setLoader(false);

            swalWithBootstrapButtons.fire({
                title: "Sent!",
                text: "Please check your email, OTP has been sent.",
                icon: "success",
            });
        }

        if (!response.ok) {
            setLoader(false);
            setErrorMsg(json.error);
            swalWithBootstrapButtons.fire({
                title: "Not Sent!",
                text: "OTP has not been sent, Please try again later",
                icon: "error",
            });
        }
        setIsEmailVerified(true);
    };

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

    return (
        <div className="login-signup-container">
            <div className="login-signup-form">
                <h2 className="text-center">{t("header")}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label"> {t("email")} </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder={t("email_place")}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <button
                        className="link"
                        onClick={handleVerify}
                        disabled={!email}
                    >
                        {t("email_verify")}
                    </button>

                    {isEmailVerified && (
                        <>
                            <div className="form-group mt-3">
                                <label className="label">{t("password")}</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder={t("password_place")}
                                    autoComplete="true"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    required
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label className="label">
                                    {t("re_password")}
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder={t("re_password_place")}
                                    autoComplete="true"
                                    onChange={(e) =>
                                        setRe_password(e.target.value)
                                    }
                                    value={re_password}
                                    required
                                />
                            </div>
                            <div className="otp-form mt-3">
                                <div className="otp-inputs">
                                    {otp.map((value, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            value={value}
                                            onChange={(e) =>
                                                handleChange(e, index)
                                            }
                                            onKeyDown={(e) =>
                                                handleKeyDown(e, index)
                                            }
                                            ref={(el) =>
                                                (inputRefs.current[index] = el)
                                            }
                                            className="form-control otp-input"
                                            disabled={success}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-block mt-1"
                                disabled={loading}
                            >
                                {t("button")}
                            </button>
                        </>
                    )}

                    {error && <p> {error} </p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
