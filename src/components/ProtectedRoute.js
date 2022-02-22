import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, isLogined }) {
  const userToken = localStorage.getItem("userToken");

  if (isLogined) {
    return userToken ? element : <Navigate to="/login" replace />;
  } else {
    return !userToken ? element : <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
