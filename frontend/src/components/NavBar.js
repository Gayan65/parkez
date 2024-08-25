import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
    //get user
    const { user } = useAuthContext();

    //user logout
    const { logout } = useLogout();

    const handelClick = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Navbar
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
                        <div>
                            <span>User : {user.email}</span>{" "}
                            <button
                                className="btn btn-outline-primary"
                                onClick={handelClick}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
