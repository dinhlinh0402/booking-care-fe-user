import requestClient from "../RequestClient/index";

const DepthsApi = {
  getAllDepths() {
    const urlParam = "specialty";

    return requestClient.get(urlParam);
  },

  getOneDepth(id) {
    const urlParam = `specialty/${id}`;

    return requestClient.get(urlParam);
  },

  getOneDepthInfo(id) {
    const urlParam = `specialty/specialty-clinic/${id}`;

    return requestClient.get(urlParam);
  },

  postDepth(data) {
    const urlParam = `specialty`;

    return requestClient.post(urlParam, data);
  },

  deleteDepthInfo(id) {
    const urlParam = `specialty-infor/${id}`;

    return requestClient.delete(urlParam);
  },

  updateDepthInfo(id, data) {
    const urlParam = `specialty-infor/${id}`;

    return requestClient.put(urlParam, data);
  },
};

export default DepthsApi;
