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
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Navbar
                </Link>
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
