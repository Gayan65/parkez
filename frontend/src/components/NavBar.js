import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import navLogo from "../assets/img/NavLogo.png";

const NavBar = () => {
    //get user
    const { user } = useAuthContext();

    // Extract the first letter of the user's email
    const firstLetter = user?.email?.charAt(0).toUpperCase();

    //user logout
    const { logout } = useLogout();

    const handelClick = () => {
        logout();
    };

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
                                        {" "}
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={handelClick}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                    <li>user: {user && user.email}</li>
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
