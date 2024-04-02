import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
