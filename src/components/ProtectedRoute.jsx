import { useAuth } from "../context/Auth";
import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function ProtectedRoute({ onlyHome }) {
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

  if (!loading && !isAuth && !onlyHome) return <Navigate to="/login" replace />;

  if (!loading && isAuth && onlyHome) return <Navigate to="/home" replace />;

  return <Outlet />;
}
