import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

//auth context
import { useAuthContext } from "./hooks/useAuthContext";
import { useLogout } from "./hooks/useLogout";
import { setLogout } from "./utils/fetchWrapper";

//components and routes
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CreateBuildingPage from "./pages/admin/CreateBuildingPage";
import BuildingDetails from "./pages/admin/BuildingDetails";
import ParkingSelect from "./pages/ParkingSelect";
import MyParking from "./pages/MyParking";
import ParkRequest from "./pages/ParkRequest";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgetPassword from "./pages/ForgetPassword";
import Tasks from "./pages/admin/Tasks";
import Profile from "./pages/Profile";
import UserManagement from "./pages/admin/UserManagement";

function App() {
    //user object
    const { user } = useAuthContext();
    const { logout } = useLogout();

    useEffect(() => {
        setLogout(logout);
    }, [logout]);

    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path="/forget_password"
                        element={<ForgetPassword />}
                    />
                    <Route
                        path="/login"
                        element={!user ? <Login /> : <Navigate to={"/"} />}
                    />
                    <Route
                        path="/signup"
                        element={!user ? <Signup /> : <Navigate to={"/"} />}
                    />
                    <Route
                        path="/create"
                        element={
                            user && user.admin ? (
                                <CreateBuildingPage />
                            ) : (
                                <Navigate to={"/"} />
                            )
                        }
                    />
                    <Route
                        path="/building/:id"
                        element={
                            user && user.admin ? (
                                <BuildingDetails />
                            ) : (
                                <Navigate to={"/"} />
                            )
                        }
                    />
                    <Route
                        path="/tasks"
                        element={
                            user && user.admin ? (
                                <Tasks />
                            ) : (
                                <Navigate to={"/"} />
                            )
                        }
                    />
                    <Route
                        path="/user_management"
                        element={
                            user && user.admin ? (
                                <UserManagement />
                            ) : (
                                <Navigate to={"/"} />
                            )
                        }
                    />
                    <Route
                        path="/parking_view"
                        element={
                            user ? <ParkingSelect /> : <Navigate to={"/"} />
                        }
                    />

                    <Route
                        path="/profile-page"
                        element={user ? <Profile /> : <Navigate to={"/"} />}
                    />

                    <Route
                        path="/my-parking"
                        element={user ? <MyParking /> : <Navigate to={"/"} />}
                    />

                    <Route
                        path="/park-request"
                        element={user ? <ParkRequest /> : <Navigate to={"/"} />}
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
