import axios from "./axios";

export const loginRequest = (user) => axios.post("/login", user);

export const registerRequest = (user) => axios.post("/register", user);

export const logoutRequest = () => axios.post("/logout");

export const verTokenRequest = () => axios.get("/auth/verify-token");
