import requestClient from "../RequestClient";

const BookingApi = {
  createBooking(data) {
    const urlParam = "bookings";
    return requestClient.post(urlParam, data);
  },

  updateBooking(data, bookingId) {
    const urlParam = `bookings/${bookingId}`;

    return requestClient().put(urlParam, data);
  },

  getBookings(params) {
    const urlParam = 'bookings';
    return requestClient.get(urlParam, { params: params });
  }
};

export default BookingApi;