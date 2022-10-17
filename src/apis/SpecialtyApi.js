import requestClient from "./RequestClient";

const SpecialtyApi = {
  getAll(params) {
    const urlParam = "specialty";

    return requestClient.get(urlParam, { params: params });
  },
  getOne(id) {
    const urlParam = `specialty/${id}`;

    return requestClient.get(urlParam);
  },

  addNewSpecialty(data, token) {
    const urlParam = `specialty`;
    return requestClient.post(urlParam, data, token);
  },

  deleteSpecialty(id, token) {
    const urlParam = `specialty/${id}`;

    return requestClient.delete(urlParam, token);
  },

  updateSpecialty(id, data, token) {
    const urlParam = `specialty/${id}`;

    return requestClient.put(urlParam, data, token);
  },

  getSpecialtiesClinic(id) {
    const urlParam = `specialty/specialty-clinic/${id}`;

    return requestClient.get(urlParam);
  },
};

export default SpecialtyApi;
