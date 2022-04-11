import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import localStorageService from "./localStorageService";
import appConfig from "../config";

export const WithAxios = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const accessToken = localStorageService.getAccessToken();
        //const accessToken = store.getState().user.accessToken;
        if (accessToken) {
          config.headers["Authorization"] = accessToken;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      function (error) {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          originalRequest.url === `${appConfig.api}/token/refresh`
        ) {
          localStorageService.removeAccessToken();
          navigate("/login", { replace: true });
          return Promise.reject(error);
        }

        if (error.response.status === 400 && !originalRequest._retry) {
          originalRequest._retry = true;
          return axios.get(`${appConfig.api}/token/refresh`).then((res) => {
            if (res.status === 201) {
              localStorageService.setAccessToken(res.headers.authorization);
              axios.defaults.headers.common["Authorization"] =
                localStorageService.getAccessToken();
              return axios(originalRequest);
            }
          });
        }
        return Promise.reject(error);
      }
    );
  });
  return children;
};
