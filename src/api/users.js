import axios from "./axios";

export const updateInfoRequest = (info) => axios.put("/user", info);

export const updatePasswRequest = (passws) =>
  axios.put("/user/change-password", passws);
