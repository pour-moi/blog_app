import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = ({ isAuthenticated }) => {
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
