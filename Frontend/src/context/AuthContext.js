import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import baseurl from "../components/const";
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
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [numberOfInactiveAlumni, setNumberOfInactiveAlumni] = useState(0);
  const [imageRefresh, setImageRefresh] = useState(false);
  const [ProfileImage, setProfileImage] = useState("");
  const [reloadFilter, setReloadFilter] = useState(false);
  const [isAllPostPage, setIsAllPostPage] = useState(false);
  const [reloadAdminData, setReloadAdminData] = useState(false);
  const[ resetFilter, setResetFilter] = useState(false);
  
  const toggelreloadAdminData = () => {
    setReloadAdminData((prev) => !prev);
  }
   
 const [Alumnifilters, setAlumniFilters] = useState({
   full_name: "",
   Branch: "",
   Education: "",
   graduation_year_min: "",
   graduation_year_max: "",
   current_company_name: "",
   previous_companies: "",
   job_title: "",
   preferred_contact_method : '',
   years_of_experience_min: "",
   years_of_experience_max:"",
   current_city: "",
   current_country: "",
   industry: "",
   skills: "",
 });
  
  const [studentFilters, setStudentFilters] = useState({
    full_name: "",
    Branch: "",
    graduation_year_min: "",
    graduation_year_max: "",
    skills: "",
    Heading: "",
    Education: "",
    current_year_of_study_min: "",
    current_year_of_study_max: "",
  });


  const [hodFilters, setHODFilters] = useState({
    full_name: "", // For filtering by full name
    Branch: "", // For filtering by Branch
    designation: "",
  });
 
  const [postFilters, setPostFilters] = useState({
    title: "",
    full_name: "",
    tag: "",
    created_at_min: "",
    created_at_max: "",
    is_alumni: "",
    is_superuser: "",
    sort_order: "",

  });

  const location = useLocation();

  const toggleimageRefresh = () => {
    setImageRefresh((prev) => !prev);
  }

 
  
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
   
  const toggelFilter = () => {  
    setReloadFilter((prev) => !prev);
  };
  const toggleAddAdminModal = () => {
    setIsAddAdminModalOpen((prev) => !prev);
  };
  const toggleLogin = () => {
    setLogin((prev) => !prev);
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

   const fetchAlumniData = async () => {
     setLoading(true);
     const token = localStorage.getItem("authTokens")
       ? JSON.parse(localStorage.getItem("authTokens"))
       : null;

     try {
       const response = await axios.get(
         `${baseurl}/inactive-alumni/`,
         {
           headers: {
             Authorization: `Bearer ${token?.access}`,
           },
         }
       );

       if (response.status === 200) {
        
         setNumberOfInactiveAlumni(response.data.length); 
       }
     } catch (error) {
       console.error("Error fetching alumni data:", error.message);
      
     } finally {
       setLoading(false);
     }
   };
  
  
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
      toggleLogin();
      navigate("/");
    } catch (error) {
      console.error("An error occurred while logging out:", error);
      // Handle the error here, e.g., show a message to the user
    }
  };

  const getImage = async () => {
    console.log("Fetching profile image...", userData);

    try {
      if(userData?.user_id ){
        const response = await axios.get(
          `${baseurl}/get-image/${userData?.user_id}/`
        );

        if (response.status === 200) {
          setProfileImage(response.data["image_url"]);
        }
      }
      
        
    } catch (error) {
        console.log("An error occurred while fetching profile image:", error);
    }
};

  //* verify access tokens 
  const verifyaccessToken = async () => {
    const token = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
    try {
      if (!token) {
        //  navigate("/login")
        console.log("1.Token not found");
        return -1;
      }
      // Verify access token
      const response = await fetch(`${baseurl}/api/token/verify/`, {
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
        
        console.log("2. Access token verification failed");
        return -1;
      }  
      else {
        console.log("3. Access token verification successful");
        return 1;
      }
    } catch (error) {
      console.error(
        "An error occurred while verifying access token",
        error
      );
      console.log("4. Access token verification failed");
      return -1;
    }
  };


   //* useEffect
  useEffect(() => {
    verifyaccessToken();
    fetchAlumniData();
    
    const tokenData = JSON.parse(localStorage.getItem("authTokens")); 
    if (tokenData && tokenData.access) {
      const decodedToken = jwtDecode(tokenData.access);     
      setUserData(decodedToken);
    }
  }, []);

  useEffect(() => {
    setProfileImage("");
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
  
  useEffect(() => {
         getImage();
  }, [userData, imageRefresh]);
  

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
    toggleAddAdminModal,
    isAddAdminModalOpen,
    setIsAddAdminModalOpen,
    numberOfInactiveAlumni,
    setNumberOfInactiveAlumni,
    imageRefresh,
    setImageRefresh,
    toggleimageRefresh,
    ProfileImage,
    getImage,
    toggleLogin,
    toggelFilter,
    reloadFilter,
    isAllPostPage,
    setIsAllPostPage,
    postFilters,
    setPostFilters,
    reloadAdminData,
    setReloadAdminData,
    toggelreloadAdminData,
    resetFilter,
    setResetFilter,
  };



  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
