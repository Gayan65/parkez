import React from "react";

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="text-center">Login</h2>
                <form>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            autoComplete="true"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-3"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
