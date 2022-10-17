import requestClient from "../RequestClient";

const ClinicApi = {
  getAllClinics(params) {
    const urlParam = "clinic";

    return requestClient.get(urlParam, { params: params });
  },

  getOne(id) {
    const urlParam = `clinic/${id}`;

    return requestClient.get(urlParam);
  },

  addNewClinic(data, token) {
    const urlParam = `clinic`;

    return requestClient.post(urlParam, data, token);
  },

  deleteClinic(id, token) {
    const urlParam = `clinic/${id}`;

    return requestClient.delete(urlParam, token);
  },

  updateClinic(id, data, token) {
    const urlParam = `clinic/${id}`;

    return requestClient.put(urlParam, data, token);
  },

  getOneInfo(clinicId) {
    const urlParam = `clinic-infor/${clinicId}`;

    return requestClient.get(urlParam);
  },

  addClinicInfo(data) {
    const urlParam = `clinic-infor`;

    return requestClient.post(urlParam, data);
  },

  deleteClinicInfo(id, user) {
    const urlParam = `clinic-infor/${id}`;

    return requestClient.delete(urlParam);
  },

  updateClinicInfo(id, data, user) {
    const urlParam = `clinic-infor/${id}`;

    return requestClient.put(urlParam, data);
  },
};

export default ClinicApi;
