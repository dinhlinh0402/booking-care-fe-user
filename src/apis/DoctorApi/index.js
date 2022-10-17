import requestClient from "../RequestClient";

const DoctorApi = {
  getAll(param) {
    const urlParam = "doctor";

    return requestClient.get(urlParam, { params: param });
  },

  getOne(id, token) {
    const urlParam = `doctor/${id}`;

    return requestClient.get(urlParam);
  },

  getOneInfo(id, token) {
    const urlParam = `doctor-infor/${id}`;

    return requestClient.get(urlParam);
  },

  addDoctorInfo(data) {
    const urlParam = `doctor-infor`;

    return requestClient.post(urlParam, data);
  },

  deleteDoctorInfo(id, user) {
    const urlParam = `doctor-infor/${id}`;

    return requestClient.delete(urlParam);
  },

  updateDoctorInfo(id, data, user) {
    const urlParam = `doctor-infor/${id}`;

    return requestClient.put(urlParam, data);
  },
};

export default DoctorApi;
