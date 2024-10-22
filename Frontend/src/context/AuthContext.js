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
 const [filters, setFilters] = useState({
   full_name: "",
   Branch: "",
   graduation_year_min: 1981,
   graduation_year_max: 2100,
   mobile: "",
   current_company_name: "",
   job_title: "",
   years_of_experience_min: 0,
   years_of_experience_max: 100,
   current_city: "",
   current_country: "",
   industry: "",
   skills: "",
 });

  const location=useLocation();
  
   
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
        navigate("/login");
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
        navigate("/login");
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
    filters: filters,
    setFilters: setFilters
  };

 

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
