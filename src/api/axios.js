import axios from "axios";

const instance = axios.create({
  baseURL: "rosanixapi-production.up.railway.app:8080/api",
  withCredentials: true,
});

export default instance;
