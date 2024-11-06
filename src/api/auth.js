import axios from "axios";

const API = "http://192.168.5.114:4000/api";

export const loginRequest = (user) => axios.post(`${API}/login`, user);

export const registerRequest = (user) => axios.post(`${API}/register`, user);
