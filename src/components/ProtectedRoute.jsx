import { useAuth } from "../context/Auth";
import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function ProtectedRoute({ alrRegistered = false }) {
  const { loading, isAuth } = useAuth();

  if (loading)
    return (
      <Spin
        spinning={loading}
        fullscreen
        indicator={
          <LoadingOutlined spin style={{ fontSize: 80, color: "#FFD6FF" }} />
        }
      />
    );

  if (!loading && !isAuth && !alrRegistered)
    return <Navigate to="/login" replace />;

  if (!loading && isAuth && alrRegistered)
    return <Navigate to="/home" replace />;

  return <Outlet />;
}
