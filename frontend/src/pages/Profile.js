import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

//sweet alert
import Swal from "sweetalert2";

const Profile = () => {
    //user
    const { user } = useAuthContext();

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
            .then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "Sent!",
                        text: "Please check your email, OTP has been sent.",
                        icon: "success",
                    });
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
                    className="btn-outline-primary"
                    onClick={handleOtpRequest}
                >
                    Request OTP
                </button>
                <div>
                    <p className="paragraph">
                        Please ensure your password meets the following
                        criteria:
                    </p>
                    <ol className="paragraph text-justify fw-light fst-italic">
                        <li>Minimum Length: At least 8 characters long.</li>
                        <li>
                            Lowercase Letters: Must include at least one
                            lowercase letter (e.g., <code>a</code>,{" "}
                            <code>b</code>, <code>c</code>).
                        </li>
                        <li>
                            Uppercase Letters: Must include at least one
                            uppercase letter (e.g., <code>A</code>,{" "}
                            <code>B</code>, <code>C</code>).
                        </li>
                        <li>
                            Numbers: Must include at least one numeric digit
                            (e.g., <code>0</code>, <code>1</code>,{" "}
                            <code>2</code>).
                        </li>
                        <li>
                            Symbols: Must include at least one special character
                            (e.g., <code>!</code>, <code>@</code>,{" "}
                            <code>#</code>, <code>$</code>).
                        </li>
                        <li>
                            Avoid Simplicity: Use unique combinations of
                            characters; avoid repetitive patterns.
                        </li>
                        <li>
                            No Spaces: Passwords must not contain any spaces.
                        </li>
                    </ol>
                </div>

                <div className="row">
                    {/* Hidden username field for accessibility */}
                    <input
                        type="text"
                        name="username"
                        style={{ display: "none" }}
                        aria-hidden="true"
                        autoComplete="username"
                    />
                    <div className="col-md-4 mb-3">
                        <label className="form-label label">New password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your new password"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label label">
                            Re-enter new password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Re-enter your new password"
                            autoComplete="new-password"
                        />
                    </div>
                </div>
                <div className="col-md-2 mb-3">
                    <input
                        type="submit"
                        className="btn"
                        value={"Save changes"}
                    />
                </div>
            </form>
        </div>
    );
};

export default Profile;
