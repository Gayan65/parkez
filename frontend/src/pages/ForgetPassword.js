import React from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
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
        </div>
    );
};

export default ForgetPassword;
