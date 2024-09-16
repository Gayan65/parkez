import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //send email to the api for verify and send the otp
        const response = await fetch("/api/user/forget/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email }),
        });

        const json = await response.json();

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
        <div className="container container-custom">
            <h1 className="header">Password Reset Instructions</h1>
            <p className="paragraph">
                To reset your password, please follow these steps:
            </p>
            <ol className="list">
                <li>
                    Request a One-Time Password (OTP) by sending a request to
                    the designated email address.
                </li>
                <li>Check your email for the OTP.</li>
                <li>
                    Use the OTP to reset your password through the provided link
                    or portal.
                </li>
            </ol>
            <p className="paragraph">
                If you encounter any issues, please{" "}
                <Link className="link-contact" to={"/"}>
                    contact support
                </Link>{" "}
                for further assistance.
            </p>
            <form onSubmit={handleSubmit} className="other-form">
                <div className="form-group">
                    <label className="label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        disabled={success}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                    disabled={success}
                >
                    Request OTP
                </button>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message"> {message} </p>}
            </form>
        </div>
    );
};

export default ForgetPassword;
