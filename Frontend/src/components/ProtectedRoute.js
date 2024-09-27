import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const isAuthenticated = () => {
  const token = localStorage.getItem("authTokens");
  return token ? true : false;
};

const ProtectedRoute = ({ element: Component }) => {
  const { showNotification } = useContext(AuthContext); 

  if (!isAuthenticated()) {
    
    showNotification("Please login first", "warning", "Warning");
    return <Navigate to="/login" replace />;
  }

  return Component;
};

export default ProtectedRoute;
