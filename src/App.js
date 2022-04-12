import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Booking, Login } from "./pages";
import { Navbar, ProtectedRoute } from "./components";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);

  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <Routes>
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
      </Routes>
    </div>
  );
}

export default App;
