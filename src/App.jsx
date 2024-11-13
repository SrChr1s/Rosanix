import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const DashboardLazy = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute role="usuario" fallback="/login" />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route element={<ProtectedRoute role="admin" fallback="/notfound" />}>
        <Route
          path="/dashboard"
          element={
            <Suspense
              fallback={
                <Spin
                  spinning={true}
                  fullscreen
                  indicator={
                    <LoadingOutlined
                      spin
                      style={{
                        fontSize: 80,
                        color: "#FFD6FF",
                      }}
                    />
                  }
                />
              }
            >
              <DashboardLazy />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
