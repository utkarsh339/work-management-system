import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleProtectedRoute({ allowedRole, children }) {
  const role = useSelector((state) => state.auth.role);
  if (role !== allowedRole) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

export default RoleProtectedRoute;
