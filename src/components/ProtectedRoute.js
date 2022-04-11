import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import config from "../config";
import { setAccessToken } from "../redux/slices/userSlice";
import localStorageService from "../services/localStorageService";

function ProtectedRoute({ element, mustLogined }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = localStorageService.getAccessToken();
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    console.log(accessToken);
    if (isLoggedIn) {
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn]);

  /*   useEffect(() => {
    if (mustLogined) {
      if (accessToken) {
        axios
          .post(config.api + "/token/access", {})
          .then(({ data, headers }) => {})
          .catch((error) => {
            switch (error.toJSON().status) {
              case 401:
                axios
                  .get(config.api + "/token/refresh")
                  .then(({ data, headers }) => {
                    localStorageService.setAccessToken(headers.authorization);
                    //dispatch(setAccessToken({ token: headers.authorization }));
                  })
                  .catch((error) => {
                    if (error.toJSON().status === 401) {
                      localStorageService.removeAccessToken();
                      //dispatch(setAccessToken({ token: null }));
                    }
                  });
                break;
              default:
                console.error(error);
                break;
            }
          });
      }
    }
  }); */

  if (mustLogined) {
    return localStorageService.getAccessToken() ? (
      element
    ) : (
      <Navigate to="/login" replace />
    );
  } else {
    return !localStorageService.getAccessToken() ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  }
}

export default ProtectedRoute;
