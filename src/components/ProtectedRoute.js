import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import config from "../config";

function ProtectedRoute({ element, mustLogined }) {
  const storageToken = localStorage.getItem("userToken");

  const [isLogined, setIsLogined] = useState(false);

  // useEffect(() => {
  //   isLogined &&
  //     axios
  //       .post(config.api + "/token", {
  //         token: storageToken,
  //       })
  //       .then(({ data, headers }) => {
  //         localStorage.setItem("userToken", headers.authorization);
  //         setUserToken(headers.authorization);
  //       })
  //       .catch((error) => {
  //         switch (error.toJSON().status) {
  //           case 401:
  //             localStorage.removeItem("userToken");
  //             setUserToken(null);
  //             break;
  //           default:
  //             console.error(error);
  //             break;
  //         }
  //       });
  // });

  useEffect(() => {
    mustLogined &&
      axios
        .post(config.api + "/token", {
          token: storageToken || " ",
        })
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
  });

  if (mustLogined) {
    return isLogined ? element : <Navigate to="/login" replace />;
  } else {
    return !isLogined ? element : <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
