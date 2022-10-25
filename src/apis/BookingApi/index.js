import requestClient from "../RequestClient";

const BookingApi = {
  createBooking(data) {
    const urlParam = "bookings";
    return requestClient.post(urlParam, data);
  },


};

export default BookingApi;
