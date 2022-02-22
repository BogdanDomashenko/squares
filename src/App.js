import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Booking } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/booking" element={<Booking />} />
      </Routes>
    </div>
  );
}

export default App;
