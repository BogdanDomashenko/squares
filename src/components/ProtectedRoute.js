import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import config from "../config";
import { setAccessToken } from "../redux/slices/userSlice";

function ProtectedRoute({ element, mustLogined }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(({ user }) => user.accessToken);

  useEffect(() => {
    if (mustLogined) {
      if (accessToken) {
        axios
          .post(
            config.api + "/token/access",
            {},
            { headers: { Authorization: accessToken } }
          )
          .then(({ data, headers }) => {})
          .catch((error) => {
            switch (error.toJSON().status) {
              case 401:
                axios
                  .get(config.api + "/token/refresh")
                  .then(({ data, headers }) => {
                    dispatch(setAccessToken({ token: headers.authorization }));
                  })
                  .catch((error) => {
                    if (error.toJSON().status === 401) {
                      dispatch(setAccessToken({ token: null }));
                    }
                  });
                break;
              default:
                console.error(error);
                break;
            }
          });
      } else {
        dispatch(setAccessToken({ token: null }));
      }
    }
  });

  if (mustLogined) {
    return accessToken ? element : <Navigate to="/login" replace />;
  } else {
    return !accessToken ? element : <Navigate to="/" replace />;
  }
}

export default ProtectedRoute;
