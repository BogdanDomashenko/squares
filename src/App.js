import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Booking, Login } from "./pages";
import { Navbar, ProtectedRoute } from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          exact
          path="/booking"
          element={<ProtectedRoute element={<Booking />} />}
        />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
