import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const createVehicle = (vehicle, imageId) => {
  return axios.post(`${API_URL}car/admin/${imageId}/add`, vehicle, {
    headers: authHeader(),
  });
};


const deleteVehicle = (vehicleId) => {
  return axios.delete(`${API_URL}car/admin/${vehicleId}/auth`, {
    headers: authHeader(),
  });
};


const updateVehicle = (vehicle, imageId, vehicleId) => {
  return axios.put(`${API_URL}car/admin/auth?id=${vehicleId}&imageId=${imageId}`, vehicle, {
    headers: authHeader(),
  });
};


const downloadVehicles = () => {
  return axios.get(`${API_URL}excel/download/cars`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: "arraybuffer",
  });
};

const uploadVehicleImage = (file) => {
  return axios.post(`${API_URL}files/upload`, file, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
};

export { downloadVehicles, uploadVehicleImage, createVehicle, deleteVehicle, updateVehicle };
