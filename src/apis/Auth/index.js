import requestClient from "../RequestClient";

const AuthApi = {
  getAuth() {
    const urlParam = "auth/me";

    return requestClient.get(urlParam);
  },

  changePassword(data) {
    const urlParam = 'auth/change-password';
    return requestClient.post(urlParam, data);
  }
};

export default AuthApi;