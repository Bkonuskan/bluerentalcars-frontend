import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const login = (credentials) => {
    return axios.post(`${API_URL}login`, credentials );
}

const register = (user) => {;
    return axios.post(`${API_URL}register`, user);
}

export {
    login,
    register
}