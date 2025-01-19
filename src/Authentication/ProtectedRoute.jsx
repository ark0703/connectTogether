import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, children }) => {
  if (!isAuth) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;
