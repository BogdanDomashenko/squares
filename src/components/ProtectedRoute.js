import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const userToken = localStorage.getItem("userToken");

  return userToken ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
