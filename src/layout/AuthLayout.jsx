import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../auth/userContext";

function AuthLayout() {
  const { user } = useUser();

  return <>{user != null ? <Navigate to={`/${user.role}-dashboard`} replace /> : <Outlet />}</>;
}

export default AuthLayout;