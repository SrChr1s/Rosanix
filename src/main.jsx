// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import { TaskProvider } from "./context/Tasks";
import { AdminProvider } from "./context/Admin";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminProvider>
      <TaskProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <App />
        </BrowserRouter>
      </TaskProvider>
    </AdminProvider>
  </AuthProvider>
);
