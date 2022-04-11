import axios from "axios";
import config from "../config";
import localStorageService from "./localStorageService";

const login = (email, password) => {
  return axios
    .post(config.api + "/auth/login", { email, password })
    .then((response) => {
      localStorageService.setAccessToken(response.headers.authorization);
      return response.data;
    });
};

export default { login };
