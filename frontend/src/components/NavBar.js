import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskContext } from "../hooks/useTaskContext";

import navLogo from "../assets/img/NavLogo.png";
import { useEffect } from "react";
import LanguageDropdown from "./LanguageDropdown";

const NavBar = () => {
    //get user
    const { user } = useAuthContext();

    //task context
    const { totalTasks, task_dispatch } = useTaskContext();

    //make navigation
    const navigate = useNavigate();

    useEffect(() => {
        //fetch number of tasks
        const numberOfTasks = async () => {
            const response = await fetch("/api/tasks");
            const json = await response.json();

            if (response.ok) {
                task_dispatch({
                    type: "SET_NUMBER_OF_TOTAL_TASKS",
                    payload: json,
                });
            }
        };
        numberOfTasks();
    }, [task_dispatch]);

    // Extract the first letter of the user's email
    const firstLetter = user?.email?.charAt(0).toUpperCase();

    //user logout
    const { logout } = useLogout();

    const handelClick = () => {
        logout();
    };
    //need to add fetch the number of tasks
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    <img
                        src={navLogo}
                        alt="Logo"
                        width="50"
                        height="50"
                        className="d-inline-block align-text-top"
                    ></img>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {user && (
                                <Link className="nav-link active" to={"/"}>
                                    Home
                                </Link>
                            )}
                        </li>

                        <li className="nav-item">
                            {user && (
                                <Link
                                    className="nav-link active"
                                    to={"/park-request"}
                                >
                                    Reservation
                                </Link>
                            )}
                        </li>

                        <li className="nav-item">
                            {user && user.admin && (
                                <Link
                                    className="nav-link active"
                                    to={"/create"}
                                >
                                    Parking Management
                                </Link>
                            )}
                        </li>

                        <li className="nav-item">
                            {user && user.admin && (
                                <Link
                                    className="nav-link active position-relative"
                                    to={"/tasks"}
                                >
                                    Tasks{" "}
                                    {totalTasks > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {totalTasks}
                                        </span>
                                    )}
                                </Link>
                            )}
                        </li>
                        <li className="nav-item">
                            {user && (
                                <Link
                                    className="nav-link active"
                                    to={"/my-parking"}
                                >
                                    My Parking
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
                <div className="me-3">
                    <LanguageDropdown />
                </div>
                <div className="flex-d">
                    {!user && (
                        <div>
                            {" "}
                            <Link
                                className="btn btn-outline-primary me-1"
                                to={"/login"}
                            >
                                Login
                            </Link>
                            <Link
                                className="btn btn-outline-primary me-1"
                                to={"/signup"}
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                    {user && (
                        <div className="profile-container">
                            <div className="nav-item dropdown">
                                <button
                                    className="btn profile-icon"
                                    id="profileDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {firstLetter}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        {/* Email Box */}
                                        <div
                                            className="email-box"
                                            onClick={() =>
                                                navigate("/profile-page")
                                            }
                                        >
                                            <div className="profile-icon-inside-email-box">
                                                {firstLetter}
                                            </div>
                                            {user && user.email}
                                        </div>
                                    </li>
                                    <li>
                                        <div className="my-parking">
                                            <Link to={"/my-parking"}>
                                                My Parking
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        {" "}
                                        <button
                                            className="logout"
                                            onClick={handelClick}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
