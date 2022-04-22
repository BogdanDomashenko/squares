import config from "../config";
import api from "./api";

const listByIds = (ids) => {
  return api
    .post(`${config.api}/users/list-by-ids`, ids)
    .then((response) => response.data);
};

export default { listByIds };
