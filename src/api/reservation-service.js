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

const isVehicleAvaliable = (reservation) => {
  const { vehicleId, pickUpDateTime, dropOffDateTime } = reservation;

  return axios.get(
    `${API_URL}reservations/auth?carId=${vehicleId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}`,
    { headers: authHeader() }
  );
};

const getReservations = () => {
  return axios.get(`${API_URL}reservations/auth/all`, {headers: authHeader()});
}

const getReservation = (reservationId) => {
  return axios.get(`${API_URL}reservations/${reservationId}/auth`, {headers: authHeader()});
}


export { createReservation, isVehicleAvaliable, getReservations, getReservation };
