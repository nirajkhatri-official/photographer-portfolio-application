import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../features/auth/store/useAuthStore";

const ProtectedRoute = ({
  redirectPath = "/",
  isAuthRequired = true,
}: {
  redirectPath?: string;
  isAuthRequired?: boolean;
}) => {
  const { isUserLoggedIn } = useAuthStore();

  if (isAuthRequired && !isUserLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!isAuthRequired && isUserLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
