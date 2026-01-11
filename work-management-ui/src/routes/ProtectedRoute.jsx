import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

function ProtectedRoute({ isAuthenticated, onLogout }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <DashboardLayout onLogout={onLogout}>
      <Outlet />
    </DashboardLayout>
  );
}

export default ProtectedRoute;
