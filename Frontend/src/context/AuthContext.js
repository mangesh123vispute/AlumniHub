import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [icon, setIcon] = useState('success');
  const [title, setTitle] = useState('Notification');
  const [userData, setUserData] = useState(null);
  const [Login, setLogin] = useState(false);
  const [filter, setFilter] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ShowProfileOfId, setShowProfileOfId] = useState(false);
  const [isAllStudentPage, setIsAllStudentPage] = useState(false);
  const [isAllAlumniPage, setIsAllAlumniPage] = useState(false);
  const [isAllAdminPage, setIsAllAdminPage] = useState(false);
  const [filterClicked, setFilterClicked] = useState(false);
  const [isForgotPassPageOrActivateAccountPage, setIsForgotPassPageOrActivateAccountPage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
   
 const [Alumnifilters, setAlumniFilters] = useState({
   full_name: "",
   Branch: "",
   Education: "",
   graduation_year_min: 1981,
   graduation_year_max: 2100,
   current_company_name: "",
   previous_companies: "",
   job_title: "",
   preferred_contact_method : '',
   years_of_experience_min: 0,
   years_of_experience_max: 100,
   current_city: "",
   current_country: "",
   industry: "",
   skills: "",
 });
  
  const [studentFilters, setStudentFilters] = useState({
    full_name: "",
    Branch: "",
    graduation_year_min: 1981,
    graduation_year_max: 2100,
    skills: "",
    Heading: "",
    Education: "",
    current_year_of_study_min: 1,
    current_year_of_study_max: 4,
  });

  const [hodFilters, setHODFilters] = useState({
    full_name: "", // For filtering by full name
    Branch: "", // For filtering by Branch
    designation: "", // For filtering by designation from HODPrincipalProfile
  });


  const location = useLocation();
  
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
   
  
  const showNotification = async (msg, iconType, titleText) => {
    
    setMessage(msg);
    setIcon(iconType);
    setTitle(titleText);
    setIsOpen(true);
  };


  const navigate = useNavigate();
  const handleClose = () => {
    setIsOpen(false);
  };
  //* initial values and states
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  
  
  //* logout
  let logoutUser = async () => {
    console.log("logging out");
    if(!window.confirm("Are You Sure Want to Logout ?"))
      return;
    try {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      // alert("Logout successful!");
      await showNotification("Logout successful!", "success", "Success");
      setLogin(false);
      navigate("/");
    } catch (error) {
      console.error("An error occurred while logging out:", error);
      // Handle the error here, e.g., show a message to the user
    }
  };

  //* verify access tokens 
  const verifyaccessToken = async () => {
    const token = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
    try {
      if (!token) {
      //  navigate("/login")
        return -1;
      }
      // Verify access token
      const response = await fetch("http://127.0.0.1:8000/api/token/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token?.access }),
      });

     
      console.log("verifyAccessTokenAndUpdate", response.status, response.ok);
      if (!response.ok) {
        localStorage.removeItem("authTokens");
        setAuthTokens(null);
        setUser(null);
        // navigate("/login");
        return -1;
      }  
      else {
        return 1;
      }
    } catch (error) {
      console.error(
        "An error occurred while verifying access token",
        error
      );
      return -1;
    }
  };


   //* useEffect
  useEffect(() => {
    verifyaccessToken();
    
       const tokenData = JSON.parse(localStorage.getItem("authTokens")); 
       if (tokenData && tokenData.access) {
         const decodedToken = jwtDecode(tokenData.access);     
         setUserData(decodedToken);
    }
    
  }, []);

  useEffect(() => {
     
     const tokenData = JSON.parse(localStorage.getItem("authTokens"));
     if (tokenData && tokenData.access) {
       const decodedToken = jwtDecode(tokenData.access);
       setUserData(decodedToken);
     }
   }, [Login]);
  
  useEffect(() => {
    setShowProfileOfId(false);
    setFilterClicked(false);
  
  }, [location]);

  //* context data and functions
  let contextData = {
    user: user,
    setUser: setUser,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    logoutUser: logoutUser,
    loading: Loading,
    setLoading: setLoading,
    setIsOpen: setIsOpen,
    setMessage: setMessage,
    setIcon: setIcon,
    setTitle: setTitle,
    isOpen: isOpen,
    message: message,
    icon: icon,
    title: title,
    showNotification: showNotification,
    handleClose: handleClose,
    userData: userData,
    setUserData: setUserData,
    setLogin: setLogin,
    verifyaccessToken: verifyaccessToken,
    setFilter: setFilter,
    filter: filter,
    ShowProfileOfId,
    setShowProfileOfId,
    isAllStudentPage: isAllStudentPage,
    setIsAllStudentPage: setIsAllStudentPage,
    Alumnifilters: Alumnifilters,
    setAlumniFilters: setAlumniFilters,
    setStudentFilters: setStudentFilters,
    studentFilters: studentFilters,
    filterClicked: filterClicked,
    setFilterClicked: setFilterClicked,
    isAllAdminPage: isAllAdminPage,
    setIsAllAdminPage: setIsAllAdminPage,
    isAllAlumniPage: isAllAlumniPage,
    setIsAllAlumniPage: setIsAllAlumniPage,
    hodFilters: hodFilters,
    setHODFilters: setHODFilters,
    isForgotPassPageOrActivateAccountPage:
    isForgotPassPageOrActivateAccountPage,
    setIsForgotPassPageOrActivateAccountPage:
    setIsForgotPassPageOrActivateAccountPage,
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
  };



  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
