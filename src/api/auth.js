import axios from "./axios";

export const loginRequest = (user) => axios.post("/login", user);

export const registerRequest = (user) => axios.post("/register", user);

export const logoutRequest = () => axios.post("/logout");

export const forgotPassRequest = (email) => axios.post("/forgotpass", email);

export const testCodeRequest = (values) => axios.post("/testcode", values);

export const resetPassRequest = (values) => axios.post("/resetpass", values);

export const verTokenRequest = () => axios.get("/auth/verify-token");
