import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Auth from "../Auth";


const ProtectedRoutes = () => {
  return Auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;