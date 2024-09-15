import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
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
                <h2 className="text-center">Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
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
                        <label>Password</label>
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
                    <div className="form-group mt-3">
                        <label>Retype password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Retype password"
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
                        Sign up
                    </button>
                    {error && <p> {error} </p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
