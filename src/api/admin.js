import axios from "./axios";

export const getUsersCountsRequest = () => axios.get("/admin/users");

export const getTasksCountsRequest = () => axios.get("/admin/tasks");
