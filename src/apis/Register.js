import requestClient from "./RequestClient";

const RegisterApi = {
  addNewUser(data) {
    const urlParam = "auth/register";
    return requestClient.post(urlParam, data);
  },
};

export default RegisterApi;
