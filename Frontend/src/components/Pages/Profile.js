
import React, { useContext ,useState , useEffect, useRef , useCallback } from "react";
import axios from 'axios'
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import "./profile.css"
import AlumniProfileContent from "./AlumniProfileContent.js";
import StudentProfileContent from "./StudentProfileContent.js";
import SuperUserProfileContent from "./SuperUserProfileContent.js";


const Profile = () => {
  const location = useLocation();
  const { state } = location;
  let {
    userData,
    setFilter,
    isOpen,
    message,
    icon,
    title,
    handleClose,
    loading,
    setIsAllStudentPage,
    setIsAllAlumniPage,
    setIsAllAdminPage,
  } = useContext(AuthContext);
  
  setFilter(false);
  console.log("state", state);
  
  if (state) {
    localStorage.setItem("id", JSON.stringify(state?.id));
  }
  console.log(" userData", userData);
  const getProfileContent = () => {
    if (state?.is_student || userData?.is_student) {
      return StudentProfileContent;
    } else if (state?.is_alumni || userData.is_alumni) {
      return AlumniProfileContent;
    } else if (
      userData.is_superuser ||
      state?.is_superuser ||
      (!userData.is_student && !userData.is_alumni) ||
      (!state?.is_student && !state?.is_alumni)
    ) {
      return SuperUserProfileContent;
    }
  };

  useEffect(() => {
    setIsAllStudentPage(false);
    setIsAllAlumniPage(false);
    setIsAllAdminPage(false);
    setFilter(false);
  }, []);
  return userData ? (
    <>
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <Home
        DynamicContent={getProfileContent()}
        url="profile"
        heading="Profile"
      />
    </>
  ): <LoadingSpinner isLoading={loading} />;
};

export default Profile;