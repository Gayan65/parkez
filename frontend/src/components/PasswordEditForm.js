import React from "react";

const PasswordEditForm = () => {
    const handleSubmit = () => {
        console.log("submitted");
    };

    return (
        <div>
            <form className="other-form" onSubmit={handleSubmit}>
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

export default PasswordEditForm;
