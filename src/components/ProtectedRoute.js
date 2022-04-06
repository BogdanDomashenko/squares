import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function ProtectedRoute({ element, mustLogined }) {
  const storageToken = localStorage.getItem("userToken");

  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    if (mustLogined) {
      if (storageToken) {
        axios
          .post(
            config.api + "/token",
            {},
            { headers: { Authorization: storageToken } }
          )
          .then(({ data, headers }) => {
            setIsLogined(true);
          })
          .catch((error) => {
            switch (error.toJSON().status) {
              case 401:
                axios
                  .get(config.api + "/refresh")
                  .then(({ data, headers }) => {
                    localStorage.setItem("userToken", headers.authorization);
                    setIsLogined(true);
                  })
                  .catch((error) => {
                    if (error.toJSON().status === 401) {
                      localStorage.removeItem("userToken");
                      setIsLogined(false);
                    }
                  });
                break;
              default:
                console.error(error);
                break;
            }
          });
      } else {
        setIsLogined(false);
      }
    }
  });

  if (mustLogined) {
    return isLogined ? element : <Navigate to="/login" replace />;
  } else {
    return !isLogined ? element : <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
