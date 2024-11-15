import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ForgotPass from "./pages/ForgotPass";

const DashboardLazy = lazy(() => import("./pages/Dashboard"));
const HomeLazy = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
      </Route>

      <Route element={<ProtectedRoute role="usuario" fallback="/login" />}>
        <Route
          path="/home"
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
              <HomeLazy />
            </Suspense>
          }
        />
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
