import requestClient from "../RequestClient";

const AuthApi = {
  getAuth() {
    const urlParam = "auth/me";

    return requestClient.get(urlParam);
  },
};

export default AuthApi;
