import { createContext, useContext, useState } from "react";
import {
  getTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
  completeTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");

  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await getTasksRequest();
    setTasks(res.data);
    return res.data;
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      setTasks((prevTasks) => [...prevTasks, res.data]);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await updateTaskRequest(task);
      if (res.status === 200) setTasks(tasks.filter((t) => t !== task));
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const completeTask = async (task) => {
    try {
      const res = await completeTaskRequest(task);
      if (res.status === 200) setTasks(tasks.filter((t) => t !== task));
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        completeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
