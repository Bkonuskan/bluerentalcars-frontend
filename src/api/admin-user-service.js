import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getUsers = () => {
  return axios.get(`${API_URL}user/auth/all`, {
    headers: authHeader(),
  });
};

const getUserById = (userId) => {
  return axios.get(`${API_URL}user/${userId}/auth`, {
    headers: authHeader(),
  });
};

const createUser = (user) => {
  return axios.post(`${API_URL}add`, user, {
    headers: authHeader(),
  });
};

const updateUser = (userId, user) => {
  return axios.put(`${API_URL}user/${userId}/auth`, user, {
    headers: authHeader(),
  });
};

const deleteUser = (userId) => {
  return axios.delete(`${API_URL}user/${userId}/auth`, {
    headers: authHeader(),
  });
};

const downloadUsers = () => {
  return axios.get(`${API_URL}excel/download/users`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "arraybuffer",
  });
};

export { getUsers, createUser, downloadUsers, getUserById, updateUser, deleteUser };
