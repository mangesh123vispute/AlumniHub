import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({
  element: Component,
  students_only = false,
  alumni_only = false,
  Admin_only = false,
  is_AllowedtoAccessRequestPage = false,
  is_AllowedtoAccessAlumniPostRequestPage = false,
  notByStudent=false,
}) => {
  const navigate = useNavigate();
  const { showNotification, userData } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  // Check authentication status asynchronously
  useEffect(() => {
    const checkAuthentication = async () => {
      
      const token = localStorage.getItem("authTokens");
      if (!token) {
        await showNotification("Please login first", "warning", "Warning");
        setIsAuthenticated(false);
      } else {
        if (!userData) {
          return;
        }
        setIsAuthenticated(true);

        if (Admin_only && is_AllowedtoAccessRequestPage) {
          if (
            (userData?.is_superuser && userData?.is_allowedToJoinAlumni) ||
            userData?.username === "Admin"
          ) {
            setIsAuthenticated(true);
          } else {
            await showNotification(
              "You are not allowed to access this page",
              "warning",
              "Access Denied"
            );
            navigate("/myprofile");
          }
        } else {
          setIsAuthenticated(true);
        }

        if (Admin_only && is_AllowedtoAccessAlumniPostRequestPage) {
          if (
            (userData?.is_superuser &&
              userData?.is_allowedToAccessPostRequestTab) ||
            userData?.username === "Admin"
          ) {
            setIsAuthenticated(true);
          } else {
            await showNotification(
              "You are not allowed to access this page",
              "warning",
              "Access Denied"
            );
            navigate("/myprofile");
          }
        } else {
          setIsAuthenticated(true);
        }

        if (Admin_only) {
          if (userData?.is_superuser || userData?.username === "Admin") {
            setIsAuthenticated(true);
          } else {
            await showNotification(
              "You are not allowed to access this page",
              "warning",
              "Access Denied"
            );
            navigate("/myprofile");
          }
        } else {
          setIsAuthenticated(true);
        }

        if (alumni_only) {
          if (userData?.is_alumni) {
            setIsAuthenticated(true);
          } else {
            await showNotification(
              "You are not allowed to access this page",
              "warning",
              "Access Denied"
            );
            navigate("/myprofile");
          }
        } else {
          setIsAuthenticated(true);
        }

        if (notByStudent) {
          if (!userData?.is_student) {
            setIsAuthenticated(true);
          } else {
            await showNotification(
              "You are not allowed to access this page",
              "warning",
              "Access Denied"
            );
            navigate("/myprofile");
          }
        }
      }
    };
    checkAuthentication();
  }, [userData, location]);

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
