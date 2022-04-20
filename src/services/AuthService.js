import axios from "axios";
import config from "../config";
import LocalStorageService from "./LocalStorageService";

const signup = (email) => {
  console.log("signup");
  return axios.post(config.api + "/auth/signup", { email }).then((response) => {
    LocalStorageService.setAccessToken(response.headers.authorization);
    return response.data;
  });
};

const login = (email, password) => {
  return axios
    .post(config.api + "/auth/login", { email, password })
    .then((response) => {
      LocalStorageService.setAccessToken(response.headers.authorization);
      return response.data;
    });
};

const logout = () => {
  return axios.get(config.api + "/auth/logout").then((response) => {
    LocalStorageService.removeAccessToken();
    return response.data;
  });
};

export default { signup, login, logout };
