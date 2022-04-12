import config from "../config";
import api from "./api";

const getUserData = () => {
  return api.get(`${config.api}/user/data`).then((response) => response.data);
};

export default { getUserData };
