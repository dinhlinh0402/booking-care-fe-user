import requestClient from "./RequestClient";

const LoginApi = {
  loginUser(data) {
    const urlParam = "auth/login";
    return requestClient.post(urlParam, data);
  },
};

export default LoginApi;
