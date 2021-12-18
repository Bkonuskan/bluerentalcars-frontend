import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getReservations = () => {
  return axios.get(`${API_URL}reservations/admin/all`, {
    headers: authHeader(),
  });
};

const getReservation = (reservationId) => {
  return axios.get(`${API_URL}reservations/${reservationId}/admin`, {
    headers: authHeader(),
  });
};

const deleteReservation = (reservationId) => {
  return axios.delete(`${API_URL}reservations/admin/${reservationId}/auth`, {
    headers: authHeader(),
  });
};

const updateReservation = (reservationId, vehicleId, reservation) => {
  return axios.put(
    `${API_URL}reservations/admin/auth?carId=${vehicleId}&reservationId=${reservationId}`, reservation,
    {
      headers: authHeader(),
    }
  );
};

const downloadReservations = () => {
  return axios.get(`${API_URL}excel/download/reservations`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "arraybuffer",
  });
};

export {
  getReservations,
  downloadReservations,
  getReservation,
  deleteReservation,
  updateReservation
};
