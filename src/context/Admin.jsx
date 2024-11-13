import { createContext, useContext, useState } from "react";
import {
  createOneUserRequest,
  getTasksCountsRequest,
  getUsersRequest,
} from "../api/admin";

export const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AuthProvider");

  return context;
};

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const getAllUsers = async () => {
    const res = await getUsersRequest();
    setUsers(res.data);
    return res.data;
  };

  const getAllTasks = async () => {
    const res = await getTasksCountsRequest();
    setTasks(res.data);
    return res.data;
  };

  const createOneUser = async (user) => {
    try {
      const res = await createOneUserRequest(user);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        getAllUsers,
        users,
        createOneUser,
        tasks,
        getAllTasks,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};