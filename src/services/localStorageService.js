const ACCESS_TOKEN = "accessToken";

class localStorageService {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN, token);
  }
  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  }
}

export default new localStorageService();
