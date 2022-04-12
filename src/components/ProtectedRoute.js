import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ element, mustLogined }) {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);

  if (mustLogined) {
    return isLoggedIn ? element : <Navigate to="/login" replace />;
  } else {
    return !isLoggedIn ? element : <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
