import axios from "axios";

const instance = axios.create({
  baseURL: "https://rosanixapi-production.up.railway.app/api",
  withCredentials: true,
});

export default instance;
