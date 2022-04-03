import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function ProtectedRoute({ element, isLogined }) {
  const storageToken = localStorage.getItem("userToken") || " ";
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    isLogined &&
      axios
        .post(config.api + "/token", {
          token: storageToken,
        })
        .then(({ data, headers }) => {
          localStorage.setItem("userToken", headers.authorization);
          setUserToken(headers.authorization);
        })
        .catch((error) => {
          switch (error.toJSON().status) {
            case 401:
              localStorage.removeItem("userToken");
              setUserToken(null);
              break;
            default:
              console.error(error);
              break;
          }
        });
  });

  if (isLogined) {
    return userToken ? element : <Navigate to="/login" replace />;
  } else {
    return !userToken ? element : <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
