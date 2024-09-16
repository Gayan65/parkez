import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                >
                    Request OTP
                </button>
            </form>
        </div>
    );
};

export default ForgetPassword;
