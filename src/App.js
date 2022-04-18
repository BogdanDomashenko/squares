import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Booking, Login, Admin } from "./pages";
import { LoginModal, Navbar, ProtectedRoute, SignupModal } from "./components";
import { useSelector } from "react-redux";
import ROLES from "./utils/constants/userRoleConstants";

function App() {
  return (
    <div className="App">
      <LoginModal />
      <SignupModal />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          exact
          path="/booking"
          element={<ProtectedRoute element={<Booking />} />}
        />
        <Route
          exact
          path="/admin"
          element={
            <ProtectedRoute element={<Admin />} allowedRoles={[ROLES.admin]} />
          }
        />
        <Route
          exact
          path="/login"
          element={<ProtectedRoute element={<Login />} />}
        />
      </Routes>

      {/*       <Routes>
        <Route
          exact
          path="/"
          element={<ProtectedRoute element={<Home />} mustLogined={true} />}
        />
        <Route
          exact
          path="/booking"
          element={<ProtectedRoute element={<Booking />} mustLogined={true} />}
        />
        <Route
          exact
          path="/login"
          element={<ProtectedRoute element={<Login />} mustLogined={false} />}
        />
      </Routes> */}
    </div>
  );
}

export default App;
