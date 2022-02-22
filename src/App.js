import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Booking, Login } from "./pages";
import { Navbar, ProtectedRoute } from "./components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<ProtectedRoute element={<Home />} isLogined={true} />}
        />
        <Route
          exact
          path="/booking"
          element={<ProtectedRoute element={<Booking />} isLogined={true} />}
        />
        <Route
          exact
          path="/login"
          element={<ProtectedRoute element={<Login />} isLogined={false} />}
        />
      </Routes>
    </div>
  );
}

export default App;
