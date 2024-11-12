import axios from "./axios";

export const updateInfoRequest = (info) => axios.put("/user", info);
