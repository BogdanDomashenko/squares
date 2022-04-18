import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ element, allowedRoles }) {
  const { role } = useSelector((state) => state.user.data);

  const allowed = !allowedRoles || (role && allowedRoles.includes(role));

  return allowed ? element : <Navigate to="/" replace />;
}

export default ProtectedRoute;
