import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const createReservation = (reservation) => {
  return axios.post(
    `${API_URL}reservations/add?carId=${reservation.car}`,
    reservation,
    { headers: authHeader() }
  );
};

export { createReservation }
