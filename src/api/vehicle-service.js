import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getVehicles = () => {
  return axios.get(`${API_URL}car/visitors/all`);
};

export { getVehicles };
