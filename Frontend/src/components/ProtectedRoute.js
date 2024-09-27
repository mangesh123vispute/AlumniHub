import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ element: Component }) => {
  const { showNotification } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check authentication status asynchronously
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("authTokens");
      if (!token) {
        await showNotification("Please login first", "warning", "Warning");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuthentication();
  }, [showNotification]);

  // Show a loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the component
  return Component;
};

export default ProtectedRoute;
