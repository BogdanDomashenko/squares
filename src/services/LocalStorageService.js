const ACCESS_TOKEN = "accessToken";

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

const setAccessToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export default { getAccessToken, setAccessToken, removeAccessToken };
