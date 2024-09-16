import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, error, loading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //call the login function
        await login(email, password);

        setEmail("");
        setPassword("");
    };

    return (
        <div className="login-signup-container">
            <div className="login-signup-form">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <div className="form-group mt-3">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
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
                        Login
                    </button>
                    <Link to={"/forget_password"}>Forget password</Link>
                </form>
                {error && <p> {error} </p>}
            </div>
        </div>
    );
};

export default Login;
