import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import { useTranslation } from "react-i18next";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);

    const [t] = useTranslation("login");

    const { login, error, loading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        //call the login function
        await login(email, password);
        setLoader(false);
        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-signup-container">
            <div className="login-signup-form">
                <h2 className="text-center"> {t("header")} </h2>
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
                    <div className="form-group mt-3">
                        <label className="label"> {t("password")} </label>
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
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-3"
                        disabled={loading}
                    >
                        {t("button")}
                    </button>
                    <Link to={"/forget_password"}> {t("link")} </Link>
                </form>
                {error && <p> {error} </p>}
            </div>
            {loader && <Loader />}
        </div>
    );
};

export default Login;
