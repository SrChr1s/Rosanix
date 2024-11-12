import { useAuth } from "../context/Auth";
import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function ProtectedRoute({ active, role, fallback = "/login" }) {
  const { loading, isAuth, user } = useAuth();

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

  if ((!loading && !isAuth) || user.active != 1)
    return <Navigate to={`${fallback}`} replace />;

  if (!loading && role && user.role !== role)
    return <Navigate to={`${fallback}`} replace />;

  return <Outlet />;
}
