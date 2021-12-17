import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getVehicles = () => {
  return axios.get(`${API_URL}car/visitors/all`);
};

const getVehicle = (vehicleId) => {
  return axios.get(`${API_URL}car/visitors/${vehicleId}`);
};

export { getVehicles, getVehicle };
