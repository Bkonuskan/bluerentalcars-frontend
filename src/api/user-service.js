import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const login = (credentials) => {
  return axios.post(`${API_URL}login`, credentials);
};

const register = (user) => {
  return axios.post(`${API_URL}register`, user);
};

const getUser = () => {
  return axios.get(`${API_URL}user`, { headers: authHeader() });
};

const updateUser = (user) => {
  return axios.put(`${API_URL}user`, user, { headers: authHeader() })
}

const updatePassword = (credentials) => {
  return axios.patch(`${API_URL}user/auth`, credentials, { headers: authHeader() })
}


//https://car-rental-x.herokuapp.com/car-rental/api/

export { login, register, getUser, updateUser, updatePassword };
