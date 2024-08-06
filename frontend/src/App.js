import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//auth context
import { useAuthContext } from "./hooks/useAuthContext";

//components and routes
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import CreateBuildingPage from "./pages/admin/CreateBuildingPage";
import BuildingDetails from "./pages/admin/BuildingDetails";

function App() {
  //user object
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
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
              user && user.admin ? <BuildingDetails /> : <Navigate to={"/"} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
