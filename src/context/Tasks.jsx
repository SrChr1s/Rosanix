import { createContext, useContext, useState } from "react";
import {
  getTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
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
  };

  const createTask = async (task) => {
    try {
      await createTaskRequest(task);
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
