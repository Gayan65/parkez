import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useTranslation } from "react-i18next";

const Signup = () => {
    const [t] = useTranslation("signup");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRe_password] = useState("");

    const { signup, loading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //call the signup function
        await signup(email, password, re_password);

        setEmail("");
        setPassword("");
        setRe_password("");
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
                    <button className="link">Verify email</button>
                    <div className="form-group mt-3">
                        <label className="label">{t("password")}</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder={t("password_place")}
                            autoComplete="true"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label className="label">{t("re_password")}</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder={t("re_password_place")}
                            autoComplete="true"
                            onChange={(e) => setRe_password(e.target.value)}
                            value={re_password}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-3"
                        disabled={loading}
                    >
                        {t("button")}
                    </button>
                    {error && <p> {error} </p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
