import requestClient from "../RequestClient";

const UserApi = {
  getAll(token) {
    const urlParam = "user";

    return requestClient.get(urlParam, token);
  },
  getOne(id, token) {
    const urlParam = `user/${id}`;

    return requestClient.get(urlParam, token);
  },

  addNewUser(data, token) {
    const urlParam = `user`;

    return requestClient.post(urlParam, data, token);
  },

  deleteUser(id, token) {
    const urlParam = `user/${id}`;

    return requestClient.delete(urlParam, token);
  },

  update(id, data, token) {
    const urlParam = `user/${id}`;

    return requestClient.put(urlParam, data, token);
  },

  registerOut(data) {
    const urlParam = "users/register/out";
    return requestClient.post(urlParam, data);
  },

  getUserById(params) {
    const urlParam = `user/${params}`;
    return requestClient.get(urlParam);
  },

  changeAvatar(data) {
    const urlParam = `user/change-avatar`;
    return requestClient.post(urlParam, data);
  },

  updateUser(data, userId) {
    const urlParam = `user/${userId}`;
    return requestClient.put(urlParam, data);
  },
};

export default UserApi;