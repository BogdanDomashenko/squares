import axios from "axios";
import config from "../config";
import LocalStorageService from "./LocalStorageService";

const api = axios.create({
  baseURL: config.api,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = LocalStorageService.getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  function (error) {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url === `${config.api}/token/refresh`
    ) {
      LocalStorageService.removeAccessToken();
      return Promise.reject(error);
    }

    if (
      (error.response.status === 400 || error.response.status === 411) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return api.get(`${config.api}/token/refresh`).then((res) => {
        if (res.status === 201) {
          LocalStorageService.setAccessToken(res.headers.authorization);
          api.defaults.headers.common["Authorization"] =
            LocalStorageService.getAccessToken();
          return api(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default api;
