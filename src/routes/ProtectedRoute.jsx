import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && !user.roles?.includes(roles)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
