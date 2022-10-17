import requestClient from "./RequestClient";

const SchedulesApi = {
  getSchedules(param) {
    const urlParam = `schedules`;

    console.log("pram", param);

    return requestClient.get(urlParam, { params: param });
  },

  deleteSchedules(id, token) {
    const urlParam = `schedules/${id}`;

    return requestClient.delete(urlParam, token);
  },

  addNewSchedules(data, token) {
    const urlParam = `schedules`;

    console.log("timeeeee", data);
    return requestClient.post(urlParam, data, token);
  },
};

export default SchedulesApi;
