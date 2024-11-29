import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTaskContext } from "../hooks/useTaskContext";

import navLogo from "../assets/img/NavLogo.png";
import { useEffect } from "react";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslation } from "react-i18next";

import {
    FaHome,
    FaEnvelopeOpenText,
    FaParking,
    FaUserCog,
    FaTasks,
    FaCar,
} from "react-icons/fa";

const NavBar = () => {
    //get user
    const { user } = useAuthContext();

    const [t] = useTranslation("navbar");

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
                                <Link
                                    className="nav-link active d-flex align-items-center"
                                    to={"/"}
                                >
                                    <FaHome className="me-2" /> {t("home")}
                                </Link>
                            )}
                        </li>

                        <li className="nav-item">
                            {user && (
                                <Link
                                    className="nav-link active d-flex align-items-center"
                                    to={"/park-request"}
                                >
                                    <FaEnvelopeOpenText className="me-2" />
                                    {t("reservation")}
                                </Link>
                            )}
                        </li>

                        <li className="nav-item">
                            {user && user.admin && (
                                <Link
                                    className="nav-link active d-flex align-items-center"
                                    to={"/create"}
                                >
                                    <FaParking className="me-2" size={19} />
                                    {t("parking_mgt")}
                                </Link>
                            )}
                        </li>

                        <li className="nav-item">
                            {user && user.admin && (
                                <Link
                                    className="nav-link active d-flex align-items-center"
                                    to={"/user_management"}
                                >
                                    <FaUserCog className="me-2" size={19} />
                                    {t("user_mgt")}
                                </Link>
                            )}
                        </li>

                        <li className="nav-item">
                            {user && user.admin && (
                                <Link
                                    className="nav-link active position-relative  d-flex align-items-center"
                                    to={"/tasks"}
                                >
                                    <FaTasks className="me-2" />
                                    {t("tasks")}
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
                                    className="nav-link active d-flex align-items-center"
                                    to={"/my-parking"}
                                >
                                    <FaCar className="me-2" size={17} />
                                    {t("my_parking")}
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
                                {t("login")}
                            </Link>
                            <Link
                                className="btn btn-outline-primary me-1"
                                to={"/signup"}
                            >
                                {t("sign_up")}
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
                                                {t("my_parking")}
                                            </Link>
                                        </div>
                                    </li>
                                    <li>
                                        {" "}
                                        <button
                                            className="logout"
                                            onClick={handelClick}
                                        >
                                            {t("logout")}
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
