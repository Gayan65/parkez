import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const NavBar = () => {
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
                    <span>User : </span>
                    <button
                        className="btn btn-outline-primary"
                        onClick={handelClick}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
