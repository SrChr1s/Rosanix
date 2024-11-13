import axios from "./axios";

export const createOneUserRequest = (user) => axios.post("/admin/users", user);

export const getUsersRequest = () => axios.get("/admin/users");

export const getTasksCountsRequest = () => axios.get("/admin/tasks");
