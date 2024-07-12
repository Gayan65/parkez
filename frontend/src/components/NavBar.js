import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Navbar
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
