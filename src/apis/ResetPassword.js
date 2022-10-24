import requestClient from "./RequestClient";

const resetPasswordApi = {
  resetPassword(data) {
    const urlParam = "auth/reset-password-via-mail";
    return requestClient.post(urlParam, data);
  },
};

export default resetPasswordApi;
