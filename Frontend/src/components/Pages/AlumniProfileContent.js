import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import "./profile.css";
import axios from "axios";
import AuthContext from "../../context/AuthContext.js";
import baseurl from "../const.js";
import ImageCropper from "../../components/ImageCropper/ImageCropper";
const AlumniProfileContent = () => {
  let {
    userData,
    setLoading,
    showNotification,
    ShowProfileOfId,
    setIsAllAdminPage,
    toggleimageRefresh,
  } = useContext(AuthContext);

  useEffect(() => {
    setIsAllAdminPage(false);
  }, []);

  
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = localStorage.getItem('id');
  
  const [reload, setReload] = useState(false);

  const [isImageOpen, setIsImageOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [Image,setImage] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

 const toggleReload = () => {
   setReload(!reload);
 };
  const toggleDropdown = (postId) => {
   
    setIsDropdownOpen(isDropdownOpen === postId ? null : postId);
    
  };


const handleImageClick = () => {
  setIsImageOpen(true);
};

const handleCloseModal = () => {
  setIsImageOpen(false);
};

  const handleGradSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based
    if (
      alumniData?.user?.graduation_year === "" ||
      alumniData?.user?.graduation_month === ""
    ) {
      showNotification(
        "Please enter graduation year and month.",
        "warning",
        "Warning"
      );
      setLoading(false);
      return;
    }
    const gradYear = parseInt(alumniData?.user?.graduation_year);
    const gradMonth = parseInt(alumniData?.user?.graduation_month);
    
    try {
      if (!isNaN(gradYear) && !isNaN(gradMonth)) {
      const response = await axios.post(
        `${baseurl}/update-alumni-profile/${id || userData?.user_id}/`,
        {graduation_year: gradYear, graduation_month: gradMonth},
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        setReload(!reload);

        // Check graduation year and month logic
        if (
          gradYear > currentYear ||
          (gradYear === currentYear && gradMonth >= currentMonth)
        ) {
          showNotification(
            "You are assigned with a Student profile.",
            "success",
            "Profile Updated to Student"
          );
          localStorage.removeItem("authTokens");
        } else {
          showNotification(
            "You are assigned with the Alumni profile.",
            "success",
            "Profile Updated to Alumni"
          );
          localStorage.removeItem("authTokens");
        }
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      showNotification(
        "Error updating profile, please try again.",
        "error",
        "Error"
      );
      setLoading(false);
    }
  };
  const handleCropComplete = async (croppedImageBlob) => {
    
    // Create FormData and append the cropped image Blob
    const formData = new FormData();
     formData.append(
       "Image",
       croppedImageBlob,
       `${user.username}_${Date.now()}.jpg`
     );

    // Retrieve the token from local storage
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    try {
      // Show loading state
      setLoading(true);

      // Send PUT request to backend server with FormData
      const response = await fetch(
        `${baseurl}/update-image/${userData?.user_id}/`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      );

      // Parse response
      const data = await response.json();

      if (response.ok) {
        
        showNotification("Image uploaded successfully", "success", "Success");
        toggleimageRefresh();
        toggleReload();
        setIsModalOpen(false);
      } else {
        console.error("Image upload failed:", data);
        showNotification("Image upload failed", "error", "Error");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      showNotification(
        "Error uploading image, please try again.",
        "error",
        "Error"
      );
      setIsModalOpen(false);
    } finally {
      // Stop loading state
      setLoading(false);
    }
  }; 
  
const handleEditClick = (post) => {
setSelectedPost(post);
setIsEditModalOpen(true);
setIsDropdownOpen(null);  // Open the modal
};

 

  const [alumniData, setAlumniData] = useState({
    user: {
      // username: '',
      full_name: "",
      About: "",
      Work: "",
      Year_Joined: "",
      graduation_year: "",
      graduation_month: "",
      Branch: "",
      email: "",
      mobile: "",
      linkedin: "",
      Github: "",
      instagram: "",
      portfolio_link: "",
      resume_link: "",
      skills: "",
    },
    profile: {
      user: {
        // username: user?.username,
        full_name: user?.full_name,
        About: user?.About,
        Work: user?.Work,
        Year_Joined: user?.Year_Joined,
        graduation_year: user?.graduation_year,
        graduation_month: user?.graduation_month,
        Branch: user?.Branch,
        email: user?.email,
        mobile: user?.mobile,
        linkedin: user?.linkedin,
        Github: user?.Github,
        instagram: user?.instagram,
        portfolio_link: user?.portfolio_link,
        resume_link: user?.resume_link,
        skills: user?.skills,
      },
      Heading: user?.alumni_profile?.Heading,
      current_company_name: user?.alumni_profile?.current_company_name,
      job_title: user?.alumni_profile?.job_title,
      Education: user?.alumni_profile?.Education,
      current_city: user?.alumni_profile?.current_city,
      current_country: user?.alumni_profile?.current_country,
      years_of_experience: user?.alumni_profile?.years_of_experience,
      industry: user?.alumni_profile?.industry,
      achievements: user?.alumni_profile?.achievements,
      previous_companies: user?.alumni_profile?.previous_companies,
      preferred_contact_method: user?.alumni_profile?.preferred_contact_method,
    },
  });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const calculateProfileCompletion = () => {
    // Define the total number of fields you are checking for
    const totalFields = 26;
    let filledFields = 0;

    // List of fields to check from the user and profile data
    const fieldsToCheck = [
      alumniData.user.full_name,
      user?.Image,
      alumniData.user.About,
      alumniData.user.Work,
      alumniData.user.Year_Joined,
      alumniData.user.graduation_year,
      alumniData.user.Branch,
      alumniData.user.email,
      alumniData.user.mobile,
      alumniData.user.linkedin,
      alumniData.user.Github,
      alumniData.user.instagram,
      alumniData.user.portfolio_link,
      alumniData.user.resume_link,
      alumniData.user.skills,
      alumniData.profile.Heading,
      alumniData.profile.current_company_name,
      alumniData.profile.previous_companies,
      alumniData.profile.preferred_contact_method,
      alumniData.profile.job_title,
      alumniData.profile.Education,
      alumniData.profile.current_city,
      alumniData.profile.current_country,
      alumniData.profile.years_of_experience,
      alumniData.profile.industry,
      alumniData.profile.achievements,
    ];

    // Check if the fields are not empty or equal to the default value (e.g., "N/A", 0)
    fieldsToCheck.forEach((field) => {
      if (
        (typeof field === "string" &&
          field.trim() !== "" &&
          field.trim() !== "N/A" &&
          field.trim() !== "0" &&
          field.trim() !== "-" &&
          field.trim() !== "/media/default/def.jpeg") ||
        (typeof field === "number" && field !== 0)
      ) {
        filledFields++;
      }
    });

    // Calculate and return the profile completion percentage
    return Math.round((filledFields / totalFields) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  useEffect(() => {
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
    setLoading(true);

    axios
      .get(
        `${baseurl}/getalumni/${
           id || userData?.user_id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      )
      .then((response) => {
        setUser(response.data);
        if (response.data) {
          setAlumniData({
            user: {
              // username: response.data.username,
              full_name: response.data.full_name,
              About: response.data.About,
              Work: response.data.Work,
              Year_Joined: response.data.Year_Joined,
              graduation_year: response.data.graduation_year,
              graduation_month: response.data.graduation_month,
              Branch: response.data.Branch,
              email: response.data.email,
              mobile: response.data.mobile,
              linkedin: response.data.linkedin,
              Github: response.data.Github,
              instagram: response.data.instagram,
              portfolio_link: response.data.portfolio_link,
              resume_link: response.data.resume_link,
              skills: response.data.skills,
            },
            profile: {
              user: {
                // username: response.data.username,
                full_name: response.data.full_name,
                About: response.data.About,
                Work: response.data.Work,
                Year_Joined: response.data.Year_Joined,
                graduation_year: response.data.graduation_year,
                graduation_month: response.data.graduation_month,
                Branch: response.data.Branch,
                email: response.data.email,
                mobile: response.data.mobile,
                linkedin: response.data.linkedin,
                Github: response.data.Github,
                instagram: response.data.instagram,
                portfolio_link: response.data.portfolio_link,
                resume_link: response.data.resume_link,
                skills: response.data.skills,
              },
              Heading: response.data.alumni_profile?.Heading,
              current_company_name:
                response.data.alumni_profile?.current_company_name,
              job_title: response.data.alumni_profile?.job_title,
              Education: response.data.alumni_profile?.Education,
              current_city: response.data.alumni_profile?.current_city,
              current_country: response.data.alumni_profile?.current_country,
              years_of_experience:
                response.data.alumni_profile?.years_of_experience,
              industry: response.data.alumni_profile?.industry,
              achievements: response.data.alumni_profile?.achievements,
              previous_companies:
                response.data.alumni_profile?.previous_companies,
              preferred_contact_method:
                response.data.alumni_profile?.preferred_contact_method,
            },
          });

          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
        showNotification(
          "Error fetching alumni data, please try again.",
          "error",
          "Error"
        );
        setLoading(false);
      });

    localStorage.getItem("id") && localStorage.removeItem("id");
  }, [userData?.user_id, reload]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    try {
      const response = await axios.put(
        `${baseurl}/edit-alumni-profile/${id || userData?.user_id}/`,
        alumniData,
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      );
      

      if (response.status === 200) {
        setLoading(false);
        showNotification(
          response.data.detail || "Profile updated successfully.",
          "success",
          "Success"
        );
        if (reload) {
          setReload(false);
        } else {
          setReload(true);
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setLoading(false);

      // Check if the error response has user_errors or profile_errors
      if (error.response && error.response.data) {
        const { user_errors, profile_errors } = error.response.data;

        // Extract errors to show in a user-friendly format
        let errorMessage =
          "Error updating profile. Please check the following:\n";

        // Iterate over user_errors if it exists
        if (user_errors && Object.keys(user_errors).length > 0) {
          errorMessage += "User Errors:\n";
          Object.entries(user_errors).forEach(([field, messages]) => {
            errorMessage += `- ${field}: ${messages.join(", ")}\n`;
          });
        }

        // Iterate over profile_errors if it exists
        if (profile_errors && Object.keys(profile_errors).length > 0) {
          errorMessage += "Profile Errors:\n";
          Object.entries(profile_errors).forEach(([field, messages]) => {
            errorMessage += `- ${field}: ${messages.join(", ")}\n`;
          });
        }

        // Show the error notification with the constructed message
        showNotification(errorMessage, "error", "Error");
      } else {
        // If no specific errors, show a generic error message
        showNotification(
          "Error updating profile, please try again.",
          "error",
          "Error"
        );
      }
    }
  };

  const fetchPosts = async (page) => {
    try {
     
      const response = await axios.get(
        `${baseurl}/alumniPosts/author/${
          id || userData?.user_id
        }/?page=${page}&page_size=10`
      );
      setPosts(response.data.results); // Set fetched posts
      setHasMore(response.data.next !== null);
      // If 'next' is null, stop loading more posts
      const totalItems = response.data.count;
      setTotalPages(Math.ceil(totalItems / 10));
    } catch (error) {
      console.error("Error fetching posts:", error);
      showNotification(
        "Error fetching posts, please try again.",
        "error",
        "Error"
      );
    }
  };
  // Handle input changes for user data
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setAlumniData((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [name]: value, // Update the correct field in user
      },
      profile: {
        ...prevState.profile,
        user: {
          ...prevState.profile.user,
          [name]: value, // Update the same field in nested user object if needed
        },
      },
    }));
  };

  // Handle input changes for profile data
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAlumniData((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        [name]: value, // Update the correct field in profile
      },
    }));
  };

  function capitalizeFirstLetter(str) {
    if (!str) return ""; // Handle empty or undefined strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  

  useEffect(() => {
    fetchPosts(page); // Fetch the first page of posts when the component mounts
  }, [page]);

  

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("authTokens")
? JSON.parse(localStorage.getItem("authTokens")).access
: null;
    setLoading(true);
  
    

 
  
    if (!selectedPost?.title || !selectedPost?.content || !selectedPost?.tag ) {
      showNotification(
        "Please fill in all fields !",
        "warning",
        "Missing fields"
      );
      setLoading(false);
      return;
    }
  
    // Create FormData object for updating
    const formData = new FormData();
    formData.append("title", selectedPost?.title);
    formData.append("content", selectedPost?.content);
    formData.append("tag", selectedPost?.tag);
      if(Image !== null)
    formData.append("Image", Image); // Assuming `Image` is the updated file object
    formData.append("DocUrl", selectedPost?.DocUrl);
  
    await axios
      .put(`${baseurl}/alumni/posts/${selectedPost?.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        
        
        setSelectedPost(null)
        
        
        showNotification(
          "Post updated successfully.",
          "success",
          "Update successful"
        );
  
        // Close modal and reset loading
        
        setIsEditModalOpen(false);
        setLoading(false);
       
      })
      .catch((error) => {
        console.error("Error during update:", error);
        // alert("Error during update:", error.response?.data?.detail);
        showNotification(
          error.response?.data?.detail || "Error updating the post.",
          "warning",
          "Update failed"
        );
        setSelectedPost(null)
        setLoading(false);
      });
      window.location.reload()
    };

    const handleDeleteClick = async (post)=>{
      if(!window.confirm('Are You Sure want to Delete Post'))return;

      const accessToken = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens")).access
      : null;
          setLoading(true);
       
          try {
           await axios.delete(`${baseurl}/alumni/posts/${post?.id}/`,{
             headers: {
               Authorization: `Bearer ${accessToken}`,
              
             },
           })

           showNotification(
             "Post Deleted successfully.",
             "success",
             "Delete successful"
           );

           fetchPosts()

          } catch (error) {
           console.error("Error during Delete:", error);
           showNotification(
             error.response?.data?.detail || "Error Deleting the post.",
             "warning",
             "Delete failed"
           );
          }
     

     setLoading(false);
     setIsDropdownOpen(null);
     window.location.reload()
   }




  return (
    <>
      <div>
        {/* Content Header (Page header) */}

        {/* Main content */}

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {userData?.user_id === user?.id && (
                <div className="col-12 mb-3">
                  <div>Profile Completed : {profileCompletion}%</div>
                  <div className="progress progress-sm active">
                    <div
                      className="progress-bar bg-success progress-bar-striped"
                      role="progressbar"
                      aria-valuenow={20}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <div className="col-md-3 " style={{ fontSize: "0.9em" }}>
                {/* Profile Image */}
                <div
                  className="card position-relative"
                  style={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    overflow: "hidden",
                    marginBottom: "24px",
                  }}
                >
                  {/* Ribbon */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "-30px",
                      transform: "rotate(45deg)",
                      zIndex: 10,
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "6px 40px",
                      fontSize: "0.75rem",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {user
                      ? user?.is_alumni
                        ? "ALUMNI"
                        : user?.is_student
                        ? "STUDENT"
                        : "ADMIN"
                      : "USER"}
                  </div>

                  <div
                    className="card-body"
                    style={{
                      padding: "24px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      paddingTop: "40px",
                    }}
                  >
                    <div
                      className="text-center"
                      style={{ position: "relative", marginBottom: "20px" }}
                    >
                      <img
                        className="img-fluid img-circle"
                        src={
                          user?.Image
                            ? `${baseurl}/${user?.Image}`
                            : `../../dist/img/user1-128x128.jpg`
                        }
                        alt="User profile"
                        style={{
                          width: "140px",
                          height: "140px",
                          objectFit: "cover",
                          border: "4px solid white",
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                        }}
                        onError={(e) => {
                          e.target.src = `../../dist/img/user1-128x128.jpg`;
                        }}
                      />
                      {userData?.user_id === user?.id && (
                        <button
                          style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            cursor: "pointer",
                            position: "absolute",
                            bottom: "10px",
                            right: "calc(50% - 70px)",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                            transition: "all 0.2s ease",
                            zIndex: 5,
                          }}
                          onClick={() => {
                            setIsModalOpen(true);
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.1)";
                            e.target.style.backgroundColor = "#218838";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.backgroundColor = "#28a745";
                          }}
                        >
                          <i className="fas fa-pencil-alt" style={{ fontSize: "0.875rem" }}></i>
                        </button>
                      )}
                    </div>
                    <h3
                      className="text-center"
                      style={{
                        color: "white",
                        margin: "0 0 8px 0",
                        fontSize: "1.5rem",
                        fontWeight: "700",
                      }}
                    >
                      {user ? user.full_name || user.username : "User"}
                    </h3>
                    <p
                      className="text-center"
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        margin: 0,
                        fontSize: "1rem",
                        fontWeight: "500",
                      }}
                    >
                      {user?.alumni_profile?.Heading || "Professional"}
                    </p>
                  </div>
                    {isModalOpen && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "fixed",
                          zIndex: 1200,
                          left: 0,
                          top: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#fefefe",
                            borderRadius: "8px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                            maxWidth: "400px",
                            width: "90%",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          {/* Header Section */}
                          <div
                            style={{
                              backgroundColor: "#333333", // Dark background for header
                              color: "#fefefe", // Light color for text
                              padding: "10px 20px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
                              Crop Image
                            </h2>
                            <span
                              style={{
                                cursor: "pointer",
                                fontSize: "24px",
                                lineHeight: "24px",
                                color: "#fefefe",
                              }}
                              onClick={() => setIsModalOpen(false)}
                            >
                              &times; {/* Close button */}
                            </span>
                          </div>

                          {/* Image Cropper Component */}
                          <div style={{ padding: "20px", textAlign: "center" }}>
                            <ImageCropper
                              imageSrc={
                                user?.Image
                                  ? `http://127.0.0.1:8000/${user?.Image}`
                                  : `../../dist/img/user1-128x128.jpg`
                              }
                              onCropComplete={handleCropComplete}
                              cropWidth={200}
                              cropHeight={200}
                            />
                          </div>

                          {/* Footer Section */}
                          <div
                            style={{
                              backgroundColor: "#333333",
                              color: "#333333", // Dark color for text
                              padding: "10px",
                              textAlign: "center",
                            }}
                          >
                            <h3
                              className="profile-username text-center"
                              style={{
                                margin: "10px 0",
                                fontSize: "1.2rem",
                                color: "#fefefe",
                              }}
                            >
                              {user
                                ? user?.full_name || user?.username
                                : "User"}
                            </h3>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                {/* /.card */}

                {/* About Box */}
                <div
                  className="card"
                  style={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderBottom: "2px solid #e9ecef",
                      padding: "16px 20px",
                      borderRadius: "16px 16px 0 0",
                    }}
                  >
                    <h3
                      className="card-title"
                      style={{
                        margin: 0,
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#2c3e50",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <i className="fas fa-info-circle" style={{ color: "#007bff" }}></i>
                      About
                    </h3>
                  </div>
                  {/* /.card-header */}
                  <div
                    className="card-body"
                    style={{
                      maxHeight: "80vh",
                      overflowX: "auto",
                      overflowY: "auto",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "20px",
                        padding: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        borderLeft: "4px solid #007bff",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <i
                          className="fas fa-info-circle"
                          style={{ color: "#007bff", marginRight: "10px", width: "20px" }}
                        ></i>
                        <strong style={{ color: "#2c3e50", fontSize: "0.95rem" }}>About</strong>
                      </div>
                      <p
                        className="aboutfont"
                        style={{
                          margin: 0,
                          color: "#495057",
                          lineHeight: "1.6",
                          fontSize: "0.9rem",
                        }}
                      >
                        {user?.About || "No information available"}
                      </p>
                    </div>

                    {/* Info Items Grid */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {/* Work */}
                      {user?.Work && user.Work !== "N/A" && (
                        <div
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                            <i className="fas fa-briefcase" style={{ color: "#28a745", marginRight: "10px", width: "20px" }}></i>
                            <strong style={{ color: "#2c3e50", fontSize: "0.9rem" }}>Work</strong>
                          </div>
                          <p style={{ margin: 0, color: "#495057", fontSize: "0.875rem" }}>{user.Work}</p>
                        </div>
                      )}

                      {/* Education */}
                      {user?.alumni_profile?.Education && user.alumni_profile.Education !== "N/A" && (
                        <div
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                            <i className="fas fa-graduation-cap" style={{ color: "#007bff", marginRight: "10px", width: "20px" }}></i>
                            <strong style={{ color: "#2c3e50", fontSize: "0.9rem" }}>Education</strong>
                          </div>
                          <p style={{ margin: 0, color: "#495057", fontSize: "0.875rem" }}>{user.alumni_profile.Education}</p>
                        </div>
                      )}

                      {/* Branch & Graduation Year */}
                      <div
                        style={{
                          padding: "12px 16px",
                          backgroundColor: "#fff",
                          borderRadius: "8px",
                          border: "1px solid #e9ecef",
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "12px",
                        }}
                      >
                        {user?.Branch && user.Branch !== "N/A" && (
                          <div style={{ flex: 1, minWidth: "120px" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                              <i className="fas fa-code-branch" style={{ color: "#dc3545", marginRight: "8px", width: "18px" }}></i>
                              <strong style={{ color: "#2c3e50", fontSize: "0.85rem" }}>Branch</strong>
                            </div>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "4px 10px",
                                backgroundColor: "#fee",
                                color: "#c33",
                                borderRadius: "4px",
                                fontSize: "0.8rem",
                                fontWeight: "600",
                              }}
                            >
                              {user.Branch}
                            </span>
                          </div>
                        )}
                        {user?.graduation_year && (
                          <div style={{ flex: 1, minWidth: "120px" }}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                              <i className="fas fa-calendar" style={{ color: "#17a2b8", marginRight: "8px", width: "18px" }}></i>
                              <strong style={{ color: "#2c3e50", fontSize: "0.85rem" }}>Graduated</strong>
                            </div>
                            <p style={{ margin: 0, color: "#495057", fontSize: "0.875rem", fontWeight: "600" }}>{user.graduation_year}</p>
                          </div>
                        )}
                      </div>

                      {/* Location */}
                      {(user?.alumni_profile?.current_city || user?.alumni_profile?.current_country) && (
                        <div
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                            <i className="fas fa-map-marker-alt" style={{ color: "#ffc107", marginRight: "10px", width: "20px" }}></i>
                            <strong style={{ color: "#2c3e50", fontSize: "0.9rem" }}>Location</strong>
                          </div>
                          <p style={{ margin: 0, color: "#495057", fontSize: "0.875rem" }}>
                            {[user?.alumni_profile?.current_city, user?.alumni_profile?.current_country].filter(Boolean).join(", ") || "N/A"}
                          </p>
                        </div>
                      )}

                      {/* Company & Role */}
                      {user?.alumni_profile?.current_company_name && user.alumni_profile.current_company_name !== "N/A" && (
                        <div
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#e7f3ff",
                            borderRadius: "8px",
                            borderLeft: "4px solid #007bff",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <i className="fas fa-building" style={{ color: "#007bff", marginRight: "10px", width: "20px" }}></i>
                            <strong style={{ color: "#2c3e50", fontSize: "0.9rem" }}>Current Company</strong>
                          </div>
                          <p style={{ margin: "4px 0 8px 0", color: "#495057", fontSize: "0.875rem", fontWeight: "600" }}>
                            {user.alumni_profile.current_company_name}
                          </p>
                          {user?.alumni_profile?.job_title && (
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <i className="fas fa-id-badge" style={{ color: "#28a745", marginRight: "10px", width: "20px" }}></i>
                              <span style={{ color: "#495057", fontSize: "0.875rem" }}>{user.alumni_profile.job_title}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Experience */}
                      {user?.alumni_profile?.years_of_experience && user.alumni_profile.years_of_experience !== "N/A" && (
                        <div
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                            <i className="fas fa-briefcase" style={{ color: "#6f42c1", marginRight: "10px", width: "20px" }}></i>
                            <strong style={{ color: "#2c3e50", fontSize: "0.9rem" }}>Experience</strong>
                          </div>
                          <p style={{ margin: 0, color: "#495057", fontSize: "0.875rem", fontWeight: "600" }}>
                            {user.alumni_profile.years_of_experience} {parseInt(user.alumni_profile.years_of_experience) === 1 ? "Year" : "Years"}
                          </p>
                        </div>
                      )}

                      {/* Skills */}
                      {user?.skills && user.skills !== "N/A" && (
                        <div
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <i className="fas fa-laptop-code" style={{ color: "#17a2b8", marginRight: "10px", width: "20px" }}></i>
                            <strong style={{ color: "#2c3e50", fontSize: "0.9rem" }}>Skills</strong>
                          </div>
                          <p style={{ margin: 0, color: "#495057", fontSize: "0.875rem", lineHeight: "1.5" }}>{user.skills}</p>
                        </div>
                      )}

                      {/* Industry */}
                      {user?.alumni_profile?.industry && user.alumni_profile.industry !== "N/A" && (
                        <div
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                            <i className="fas fa-industry" style={{ color: "#fd7e14", marginRight: "10px", width: "20px" }}></i>
                            <strong style={{ color: "#2c3e50", fontSize: "0.9rem" }}>Industry</strong>
                          </div>
                          <p style={{ margin: 0, color: "#495057", fontSize: "0.875rem" }}>{user.alumni_profile.industry}</p>
                        </div>
                      )}

                      {/* Achievements */}
                      {user?.alumni_profile?.achievements && user.alumni_profile.achievements !== "No Achievements" && user.alumni_profile.achievements !== "N/A" && (
                        <div
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "#fff3cd",
                            borderRadius: "8px",
                            borderLeft: "4px solid #ffc107",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <i className="fas fa-trophy" style={{ color: "#ffc107", marginRight: "10px", width: "20px" }}></i>
                            <strong style={{ color: "#2c3e50", fontSize: "0.9rem" }}>Achievements</strong>
                          </div>
                          <p style={{ margin: 0, color: "#856404", fontSize: "0.875rem", lineHeight: "1.5" }}>{user.alumni_profile.achievements}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* /.card */}
              </div>

              {/* /.col */}
              <div className="col-md-9">
                <div
                  className="card"
                  style={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="card-header"
                    style={{
                      backgroundColor: "#f8f9fa",
                      borderBottom: "2px solid #e9ecef",
                      padding: "0",
                    }}
                  >
                    <ul
                      className="nav nav-pills"
                      style={{
                        border: "none",
                        margin: 0,
                      }}
                    >
                      <li className="nav-item" style={{ margin: 0 }}>
                        <a
                          className="nav-link active"
                          href="#timeline"
                          data-toggle="tab"
                          style={{
                            borderRadius: "0",
                            padding: "16px 24px",
                            color: "#007bff",
                            backgroundColor: "#fff",
                            borderBottom: "3px solid #007bff",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            if (!e.target.classList.contains("active")) {
                              e.target.style.backgroundColor = "#f0f7ff";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!e.target.classList.contains("active")) {
                              e.target.style.backgroundColor = "transparent";
                            }
                          }}
                        >
                          <i className="fas fa-address-book mr-1"></i> Contacts
                        </a>
                      </li>
                      <li className="nav-item" style={{ margin: 0 }}>
                        <a
                          className="nav-link"
                          href="#activity"
                          data-toggle="tab"
                          style={{
                            borderRadius: "0",
                            padding: "16px 24px",
                            color: "#6c757d",
                            backgroundColor: "transparent",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            if (!e.target.classList.contains("active")) {
                              e.target.style.backgroundColor = "#f0f7ff";
                              e.target.style.color = "#007bff";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!e.target.classList.contains("active")) {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#6c757d";
                            }
                          }}
                        >
                          <i className="fas fa-file-alt mr-1"></i> Posts
                        </a>
                      </li>

                      {userData?.user_id === user?.id && (
                        <li className="nav-item ">
                          <a
                            className="nav-link"
                            href="#settings"
                            data-toggle="tab"
                          >
                            <i className="fas fa-user-edit mr-1"></i> Edit
                            Profile
                          </a>
                        </li>
                      )}
                      {userData?.user_id === user?.id && (
                        <li className="nav-item ">
                          <a
                            className="nav-link"
                            href="#editGradDate"
                            data-toggle="tab"
                            onClick={() => {
                              showNotification(
                                "Your profile will change based on your graduation date. If it’s the same or after today, you’ll be a Student. If it’s before today, you’ll be an Alumni.",
                                "info",
                                "Graduation Details"
                              );
                            }}
                          >
                            <i className="fas fa-calendar-alt mr-1"></i>{" "}
                            Graduation Details
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div
                        className="tab-pane"
                        id="activity"
                        style={{
                          maxHeight: "131vh",
                          overflowY: "auto",
                          overflowX: "hidden",
                          padding: "15px",
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Post */}
                        {posts?.length === 0 ? (
                          <div
                            style={{
                              textAlign: "center",
                              fontSize: "1.5em",
                              fontWeight: "bold",
                              height: "100vh",
                            }}
                          >
                            No Posts Available
                          </div>
                        ) : (
                          <>
                            {" "}
                            {posts?.map((post, ind) => (
                              <div key={ind} className="post">
                                <div className="user-block">
                                  <img
                                    className="img-circle img-bordered-sm"
                                    src={`${baseurl}/${user?.Image || "#"}`}
                                    alt="user image"
                                  />
                                  <span className="username">
                                    <a href="#">
                                      {post?.author_name ||
                                        (post?.author_username
                                          ? post?.author_username
                                          : "Author")}
                                    </a>
                                  </span>

                                  <span className="description">
                                    {formatDate(post?.created_at) || "Date"}
                                    <br></br>
                                    <span>
                                      {" "}
                                      <b
                                        style={{
                                          color: "Green",
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {" "}
                                        {post?.tag || "Tag"}
                                      </b>
                                    </span>
                                  </span>
                                </div>

                                {/* Dropdown Button */}
                                {userData?.user_id === user?.id && (
                                  <div className="dropdown">
                                    <button
                                      className="btn btn-link"
                                      type="button"
                                      onClick={() => toggleDropdown(post?.id)}
                                      style={{
                                        padding: "0", // Remove default padding
                                        fontSize: "0.8em", // Reduced font size
                                      }}
                                    >
                                      <i
                                        className="fas fa-ellipsis-v"
                                        style={{
                                          fontSize: "1.5em",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </button>
                                    {isDropdownOpen === post?.id && (
                                      <div className="dropdown-menu show">
                                        <span
                                          onClick={() => handleEditClick(post)}
                                          className="dropdown-item"
                                          style={{ fontSize: "0.8em" }}
                                        >
                                          <i className="fas fa-edit"></i> Edit
                                        </span>
                                        <span
                                          onClick={() =>
                                            handleDeleteClick(post)
                                          }
                                          style={{ fontSize: "0.8em" }}
                                          className="dropdown-item"
                                        >
                                          <i className="fas fa-trash"></i>{" "}
                                          Delete
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Edit post  */}
                                {isEditModalOpen && (
                                  <div className="modal">
                                    <div className="modal-content">
                                      <div
                                        className="modal-header"
                                        style={{
                                          backgroundColor: "#007bff",
                                          color: "white",
                                        }}
                                      >
                                        <h3 className="modal-title">
                                          Edit Post
                                        </h3>
                                        <span
                                          className="close"
                                          onClick={() =>
                                            setIsEditModalOpen(false)
                                          }
                                        >
                                          &times;
                                        </span>
                                      </div>
                                      <form onSubmit={handleUpdateSubmit}>
                                        <div className="modal-body">
                                          <div className="form-group">
                                            <label>Title</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={selectedPost?.title || ""}
                                              onChange={(e) =>
                                                setSelectedPost({
                                                  ...selectedPost,
                                                  title: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                           <div className="form-group">
                                            <label>Tag</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={selectedPost?.tag || ""}
                                              onChange={(e) =>
                                                setSelectedPost({
                                                  ...selectedPost,
                                                  tag: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label>Content</label>
                                            <textarea
                                              className="form-control"
                                              value={
                                                selectedPost?.content || ""
                                              }
                                              onChange={(e) =>
                                                setSelectedPost({
                                                  ...selectedPost,
                                                  content: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                         
                                          {/* <div className="form-group">
                                            <label>Previous Image</label>
                                            <div className="col-auto">
                                              <a
                                                href="#"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  handleImageClick();
                                                }}
                                                className="mr-3"
                                              >
                                                <i className="fas fa-image mr-1" />{" "}
                                                Image
                                              </a>

                                              {isImageOpen && (
                                                <div
                                                  style={{
                                                    position: "fixed",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundColor:
                                                      "tranparent",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    zIndex: 1050,
                                                  }}
                                                  onClick={handleCloseModal}
                                                >
                                                  <div
                                                    style={{
                                                      position: "relative",
                                                      maxWidth: "100%",
                                                      maxHeight: "100%",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <img
                                                      src={selectedPost?.Image}
                                                      alt="Post"
                                                      style={{
                                                        // maxWidth: "100%",
                                                        // maxHeight: "100%",
                                                        width: "100%",
                                                        height: "auto",
                                                        borderRadius: "5px",
                                                        boxShadow:
                                                          "0 4px 12px rgba(0, 0, 0, 0.3)",
                                                      }}
                                                    />
                                                    <span
                                                      style={{
                                                        position: "absolute",
                                                        top: "10px",
                                                        right: "10px",
                                                        fontSize: "1.5em",
                                                        color: "#fff",
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={handleCloseModal}
                                                    >
                                                      &times;
                                                    </span>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <label>Image Upload </label>
                                            <div className="input-group">
                                              <input
                                                type="file"
                                                className="form-control"
                                                onChange={(e) =>
                                                  setImage(e.target.files[0])
                                                }
                                              />
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <label>Document URL</label>
                                            <input
                                              type="url"
                                              className="form-control"
                                              value={selectedPost?.DocUrl || ""}
                                              onChange={(e) =>
                                                setSelectedPost({
                                                  ...selectedPost,
                                                  DocUrl: e.target.value,
                                                })
                                              }
                                            />
                                          </div> */}
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="submit"
                                            className="btn btn-primary"
                                          >
                                            Update Post
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                )}

                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "1.09em",
                                  }}
                                >
                                  {post?.title || "Title"}
                                </span>
                                <p
                                  className="postfont"
                                  style={{
                                    marginTop: "0.5em",
                                    marginBottom: "0.5em",
                                    whiteSpace: "pre-wrap",
                                    wordWrap: "break-word",
                                    hyphens: "auto",
                                    overflowWrap: "break-word",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {post?.content || "Content"}
                                </p>
                               
                              </div>
                            ))}
                          </>
                        )}

                        {/* Pagination controls */}
                        <div className="card-footer">
                          <nav aria-label="Page Navigation">
                            <ul className="pagination justify-content-center m-0">
                              {/* Previous button */}
                              <li
                                className={`page-item ${
                                  page === 1 ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className={`page-link ${
                                    page === 1
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  onClick={() => setPage(page - 1)}
                                  disabled={page === 1}
                                >
                                  <i
                                    className="fas fa-arrow-left"
                                    style={{ fontSize: "1em" }}
                                  />
                                </button>
                              </li>

                              {/* Current page */}
                              <li className="page-item active">
                                <button className="page-link" disabled>
                                  {page}
                                </button>
                              </li>

                              {/* Next button */}
                              <li
                                className={`page-item ${
                                  page === totalPages ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className={`page-link ${
                                    page === totalPages
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  onClick={() => setPage(page + 1)}
                                  disabled={page === totalPages}
                                >
                                  <i
                                    className="fas fa-arrow-right"
                                    style={{ fontSize: "1em" }}
                                  />
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                      {/* /.tab-pane */}
                      <div className="active tab-pane" id="timeline">
                        <div style={{ padding: "24px", backgroundColor: "#f8f9fa", minHeight: "100%" }}>
                          {/* Contact Details Card */}
                          <div
                            className="card"
                            style={{
                              borderRadius: "16px",
                              border: "none",
                              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                              marginBottom: "24px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                                padding: "16px 24px",
                                color: "white",
                              }}
                            >
                              <h4
                                style={{
                                  margin: 0,
                                  fontSize: "1.25rem",
                                  fontWeight: "700",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <i className="fas fa-address-book"></i>
                                Contact Details
                              </h4>
                            </div>
                            <div className="card-body" style={{ padding: "24px" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {/* Email */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "12px 16px",
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    border: "1px solid #e9ecef",
                                  }}
                                >
                                  <i
                                    className="fas fa-envelope"
                                    style={{
                                      color: "#007bff",
                                      fontSize: "1.25rem",
                                      marginRight: "16px",
                                      width: "24px",
                                    }}
                                  ></i>
                                  <div style={{ flex: 1 }}>
                                    <strong style={{ color: "#2c3e50", fontSize: "0.875rem", display: "block", marginBottom: "4px" }}>Email</strong>
                                    {user?.email && user.email !== "N/A" ? (
                                      <a
                                        href={`mailto:${user.email}`}
                                        style={{
                                          color: "#007bff",
                                          textDecoration: "none",
                                          fontSize: "0.9rem",
                                          transition: "color 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = "#0056b3")}
                                        onMouseLeave={(e) => (e.target.style.color = "#007bff")}
                                      >
                                        {user.email}
                                      </a>
                                    ) : (
                                      <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>N/A</span>
                                    )}
                                  </div>
                                </div>

                                {/* LinkedIn */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "12px 16px",
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    border: "1px solid #e9ecef",
                                  }}
                                >
                                  <i
                                    className="fab fa-linkedin"
                                    style={{
                                      color: "#0077b5",
                                      fontSize: "1.25rem",
                                      marginRight: "16px",
                                      width: "24px",
                                    }}
                                  ></i>
                                  <div style={{ flex: 1 }}>
                                    <strong style={{ color: "#2c3e50", fontSize: "0.875rem", display: "block", marginBottom: "4px" }}>LinkedIn</strong>
                                    {user?.linkedin && user.linkedin !== "N/A" ? (
                                      <a
                                        href={user.linkedin.startsWith("http") ? user.linkedin : `https://${user.linkedin}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: "#0077b5",
                                          textDecoration: "none",
                                          fontSize: "0.9rem",
                                          transition: "color 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = "#005682")}
                                        onMouseLeave={(e) => (e.target.style.color = "#0077b5")}
                                      >
                                        View Profile
                                      </a>
                                    ) : (
                                      <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>N/A</span>
                                    )}
                                  </div>
                                </div>

                                {/* GitHub */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "12px 16px",
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    border: "1px solid #e9ecef",
                                  }}
                                >
                                  <i
                                    className="fab fa-github"
                                    style={{
                                      color: "#24292e",
                                      fontSize: "1.25rem",
                                      marginRight: "16px",
                                      width: "24px",
                                    }}
                                  ></i>
                                  <div style={{ flex: 1 }}>
                                    <strong style={{ color: "#2c3e50", fontSize: "0.875rem", display: "block", marginBottom: "4px" }}>GitHub</strong>
                                    {user?.Github && user.Github !== "N/A" ? (
                                      <a
                                        href={user.Github.startsWith("http") ? user.Github : `https://${user.Github}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: "#24292e",
                                          textDecoration: "none",
                                          fontSize: "0.9rem",
                                          transition: "color 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = "#000")}
                                        onMouseLeave={(e) => (e.target.style.color = "#24292e")}
                                      >
                                        View Profile
                                      </a>
                                    ) : (
                                      <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>N/A</span>
                                    )}
                                  </div>
                                </div>

                                {/* Instagram */}
                                {user?.instagram && user.instagram !== "N/A" && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "12px 16px",
                                      backgroundColor: "#fff",
                                      borderRadius: "8px",
                                      border: "1px solid #e9ecef",
                                    }}
                                  >
                                    <i
                                      className="fab fa-instagram"
                                      style={{
                                        color: "#E4405F",
                                        fontSize: "1.25rem",
                                        marginRight: "16px",
                                        width: "24px",
                                      }}
                                    ></i>
                                    <div style={{ flex: 1 }}>
                                      <strong style={{ color: "#2c3e50", fontSize: "0.875rem", display: "block", marginBottom: "4px" }}>Instagram</strong>
                                      <a
                                        href={user.instagram.startsWith("http") ? user.instagram : `https://${user.instagram}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: "#E4405F",
                                          textDecoration: "none",
                                          fontSize: "0.9rem",
                                          transition: "color 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.color = "#C13584")}
                                        onMouseLeave={(e) => (e.target.style.color = "#E4405F")}
                                      >
                                        View Profile
                                      </a>
                                    </div>
                                  </div>
                                )}

                                {/* Preferred Contact */}
                                {user?.alumni_profile?.preferred_contact_method && (
                                  <div
                                    style={{
                                      padding: "12px 16px",
                                      backgroundColor: "#e7f3ff",
                                      borderRadius: "8px",
                                      borderLeft: "4px solid #007bff",
                                    }}
                                  >
                                    <strong style={{ color: "#2c3e50", fontSize: "0.875rem", display: "block", marginBottom: "4px" }}>Preferred Contact Method</strong>
                                    <p style={{ margin: 0, color: "#495057", fontSize: "0.9rem" }}>
                                      {capitalizeFirstLetter(user.alumni_profile.preferred_contact_method)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Portfolio & Resume Card */}
                          <div
                            className="card"
                            style={{
                              borderRadius: "16px",
                              border: "none",
                              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                                padding: "16px 24px",
                                color: "white",
                              }}
                            >
                              <h4
                                style={{
                                  margin: 0,
                                  fontSize: "1.25rem",
                                  fontWeight: "700",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "12px",
                                }}
                              >
                                <i className="fas fa-folder-open"></i>
                                Portfolio & Resume
                              </h4>
                            </div>
                            <div className="card-body" style={{ padding: "24px" }}>
                              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {/* Portfolio */}
                                <div
                                  style={{
                                    padding: "16px",
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    border: "1px solid #e9ecef",
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                    <i
                                      className="fas fa-folder"
                                      style={{
                                        color: "#007bff",
                                        fontSize: "1.25rem",
                                        marginRight: "12px",
                                        width: "24px",
                                      }}
                                    ></i>
                                    <strong style={{ color: "#2c3e50", fontSize: "0.95rem" }}>Portfolio</strong>
                                  </div>
                                  {user?.portfolio_link && user.portfolio_link !== "N/A" ? (
                                    <a
                                      href={user.portfolio_link.startsWith("http") ? user.portfolio_link : `https://${user.portfolio_link}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        padding: "8px 16px",
                                        backgroundColor: "#e7f3ff",
                                        color: "#007bff",
                                        borderRadius: "6px",
                                        textDecoration: "none",
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        transition: "all 0.2s ease",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#cfe2ff";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "#e7f3ff";
                                      }}
                                    >
                                      <i className="fas fa-external-link-alt" style={{ marginRight: "8px" }}></i>
                                      Visit Portfolio
                                    </a>
                                  ) : (
                                    <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>N/A</span>
                                  )}
                                </div>

                                {/* Resume */}
                                <div
                                  style={{
                                    padding: "16px",
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    border: "1px solid #e9ecef",
                                  }}
                                >
                                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                    <i
                                      className="fas fa-file-alt"
                                      style={{
                                        color: "#28a745",
                                        fontSize: "1.25rem",
                                        marginRight: "12px",
                                        width: "24px",
                                      }}
                                    ></i>
                                    <strong style={{ color: "#2c3e50", fontSize: "0.95rem" }}>Resume</strong>
                                  </div>
                                  {user?.resume_link && user.resume_link !== "N/A" ? (
                                    <a
                                      href={user.resume_link.startsWith("http") ? user.resume_link : `https://${user.resume_link}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        padding: "8px 16px",
                                        backgroundColor: "#fff3cd",
                                        color: "#856404",
                                        borderRadius: "6px",
                                        textDecoration: "none",
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        transition: "all 0.2s ease",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = "#ffe69c";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = "#fff3cd";
                                      }}
                                    >
                                      <i className="fas fa-download" style={{ marginRight: "8px" }}></i>
                                      View Resume
                                    </a>
                                  ) : (
                                    <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>N/A</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* /.tab-pane */}
                      <div
                        className="tab-pane"
                        id="settings"
                        style={{
                          maxHeight: "131vh",
                          overflowY: "auto", // Enable vertical scrolling
                          overflowX: "hidden", // Prevent horizontal scrolling
                          padding: "15px", // Optional: add padding if needed
                          boxSizing: "border-box", // Ensure padding is included in width calculation
                        }}
                      >
                        <form
                          className="form-horizontal"
                          onSubmit={handleSubmit}
                        >
                          <p className="editheading" style={{ marginTop: "0" }}>
                            Personal Information
                          </p>
                          <div className="form-group row">
                            <label
                              htmlFor="inputFullName"
                              className="col-sm-2 col-form-label"
                            >
                              Full Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="full_name"
                                name="full_name"
                                value={alumniData?.user?.full_name}
                                onChange={handleUserChange}
                                placeholder="Full Name"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputHeading"
                              className="col-sm-2 col-form-label"
                            >
                              Education
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                type="text"
                                className="form-control"
                                id="Education"
                                name="Education"
                                value={alumniData?.profile?.Education}
                                onChange={handleProfileChange}
                                placeholder="BE in Computer Science etc.."
                                row="3"
                                style={{ resize: "vertical" }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputLinkedIn"
                              className="col-sm-2 col-form-label"
                            >
                              Branch
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="Branch"
                                name="Branch"
                                value={alumniData?.user?.Branch}
                                onChange={handleUserChange}
                                placeholder="Computer, Electronics etc.."
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputCity"
                              className="col-sm-2 col-form-label"
                            >
                              City
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="current_city"
                                name="current_city"
                                value={alumniData?.profile?.current_city}
                                onChange={handleProfileChange}
                                placeholder="Delhi,Jalgaon, mumbai etc.. "
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputCity"
                              className="col-sm-2 col-form-label"
                            >
                              Country
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="current_country"
                                name="current_country"
                                value={alumniData?.profile?.current_country}
                                onChange={handleProfileChange}
                                placeholder="India,USA etc.. "
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputMobile"
                              className="col-sm-2 col-form-label"
                            >
                              Admission Year
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="number"
                                className="form-control"
                                id="Year_Joined"
                                name="Year_Joined"
                                value={alumniData?.user?.Year_Joined}
                                onChange={handleUserChange}
                                placeholder="Admission Year"
                              />
                            </div>
                          </div>
                          {/* <div className="form-group row">
                              <label
                                htmlFor="inputLinkedIn"
                                className="col-sm-2 col-form-label"
                              >
                                Graduation Year
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="graduation_year"
                                  name="graduation_year"
                                  value={alumniData?.user?.graduation_year}
                                  onChange={handleUserChange}
                                  placeholder="Graduation Year "
                                />
                              </div>
                            </div> */}
                          <hr
                            style={{
                              border: "1px solid black",
                              marginBottom: "0.5em",
                              marginTop: "0.5em",
                            }}
                          ></hr>

                          <p className="editheading">Contact Information</p>
                          <div className="form-group row">
                            <label
                              htmlFor="inputEmail"
                              className="col-sm-2 col-form-label"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={alumniData?.user?.email}
                                onChange={handleUserChange}
                                placeholder="Email"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputMobile"
                              className="col-sm-2 col-form-label"
                            >
                              Mobile
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text" // Keep as text to allow length control
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                value={alumniData?.user?.mobile}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );

                                  if (value.length === 10) {
                                    handleUserChange({
                                      target: { name: "mobile", value },
                                    });
                                  } else if (value.length <= 10) {
                                    handleUserChange({
                                      target: { name: "mobile", value },
                                    });
                                  }
                                }}
                                placeholder="Mobile"
                                maxLength="10"
                                minLength="10"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputLinkedIn"
                              className="col-sm-2 col-form-label"
                            >
                              LinkedIn
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="linkedin"
                                name="linkedin"
                                value={alumniData?.user?.linkedin}
                                onChange={handleUserChange}
                                placeholder="LinkedIn profile link"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputLinkedIn"
                              className="col-sm-2 col-form-label"
                            >
                              Instagram
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="instagram"
                                name="instagram"
                                value={alumniData?.user?.instagram}
                                onChange={handleUserChange}
                                placeholder="Instagram profile link"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="preferred_contact_method"
                              className="col-sm-2 col-form-label"
                            >
                              Preferred Contact
                            </label>
                            <div className="col-sm-10">
                              <select
                                className="form-control"
                                id="preferred_contact_method"
                                name="preferred_contact_method"
                                value={
                                  alumniData?.profile?.preferred_contact_method
                                }
                                onChange={handleProfileChange}
                              >
                                <option value="" disabled>
                                  Select Preferred Contact Method
                                </option>
                                <option value="email">Email</option>
                                <option value="mobile">Mobile</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="instagram">Instagram</option>
                              </select>
                            </div>
                          </div>
                          <hr
                            style={{
                              border: "1px solid black",
                              marginBottom: "0.5em",
                              marginTop: "0.5em",
                            }}
                          ></hr>

                          <p className="editheading">Professional Profiles</p>

                          <div className="form-group row">
                            <label
                              htmlFor="inputGithub"
                              className="col-sm-2 col-form-label"
                            >
                              Github Link
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="Github"
                                name="Github"
                                value={alumniData?.user?.Github}
                                onChange={handleUserChange}
                                placeholder="Github link"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputLinkedIn"
                              className="col-sm-2 col-form-label"
                            >
                              Portfolio Link
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="portfolio_link"
                                name="portfolio_link"
                                value={alumniData?.user?.portfolio_link}
                                onChange={handleUserChange}
                                placeholder="Portfolio link"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputLinkedIn"
                              className="col-sm-2 col-form-label"
                            >
                              Resume Link
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="resume_link"
                                name="resume_link"
                                value={alumniData?.user?.resume_link}
                                onChange={handleUserChange}
                                placeholder="Resume link"
                              />
                            </div>
                          </div>
                          <hr
                            style={{
                              border: "1px solid black",
                              marginBottom: "0.5em",
                              marginTop: "0.5em",
                            }}
                          ></hr>

                          <p className="editheading">
                            Professional Information
                          </p>

                          {/* Profile Specific Fields */}
                          <div className="form-group row">
                            <label
                              htmlFor="inputHeading"
                              className="col-sm-2 col-form-label"
                            >
                              Heading
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                className="form-control"
                                id="Heading"
                                name="Heading"
                                value={alumniData?.profile?.Heading}
                                onChange={handleProfileChange}
                                placeholder="Front-End Engineer | Smart India Hackathon Finalist|Business coach |Digital marketer| Android development | Web development | Blockchain | AI/ML, etc.."
                                rows="3"
                                style={{ resize: "vertical" }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputLinkedIn"
                              className="col-sm-2 col-form-label"
                            >
                              About
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                type="text"
                                className="form-control"
                                id="About"
                                name="About"
                                value={alumniData?.user?.About}
                                onChange={handleUserChange}
                                placeholder="Tech Enthusiast: Passionate full-stack developer with experience in React and Django. etc"
                                rows="3"
                                style={{ resize: "vertical" }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputMobile"
                              className="col-sm-2 col-form-label"
                            >
                              Work
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                type="text"
                                className="form-control"
                                id="Work"
                                name="Work"
                                value={alumniData?.user?.Work}
                                onChange={handleUserChange}
                                placeholder="Full Stack Developer at ABC Tech. Developed and maintained web applications using React and Django, improving site performance by 30%. etc.."
                                rows="3"
                                style={{ resize: "vertical" }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputHeading"
                              className="col-sm-2 col-form-label"
                            >
                              Job Title
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="job_title"
                                name="job_title"
                                value={alumniData?.profile?.job_title}
                                onChange={handleProfileChange}
                                placeholder="Software Engineer, Manager etc."
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputCompany"
                              className="col-sm-2 col-form-label"
                            >
                              Current Company
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="current_company_name"
                                name="current_company_name"
                                value={
                                  alumniData?.profile?.current_company_name
                                }
                                onChange={handleProfileChange}
                                placeholder="TCS , Capgemini etc."
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputHeading"
                              className="col-sm-2 col-form-label"
                            >
                              Previous Companies
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                type="text"
                                className="form-control"
                                id="previous_companies"
                                name="previous_companies"
                                value={alumniData?.profile?.previous_companies}
                                onChange={handleProfileChange}
                                placeholder="TCS ,Capgemini etc."
                                rows="3"
                                style={{ resize: "vertical" }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputHeading"
                              className="col-sm-2 col-form-label"
                            >
                              Work Experience
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="number"
                                className="form-control"
                                id="years_of_experience"
                                name="years_of_experience"
                                value={alumniData?.profile?.years_of_experience}
                                onChange={handleProfileChange}
                                placeholder="Years Of Experience in Numbers"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputHeading"
                              className="col-sm-2 col-form-label"
                            >
                              Industry
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="industry"
                                name="industry"
                                value={alumniData?.profile?.industry}
                                onChange={handleProfileChange}
                                placeholder="IT , Finance , etc."
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputHeading"
                              className="col-sm-2 col-form-label"
                            >
                              Achievement
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                type="text"
                                className="form-control"
                                id="achievements"
                                name="achievements"
                                value={alumniData?.profile?.achievements}
                                onChange={handleProfileChange}
                                placeholder="Certified Front-End Developer from [Certification Body]"
                                rows="3"
                                style={{ resize: "vertical" }}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              htmlFor="inputSkills"
                              className="col-sm-2 col-form-label"
                            >
                              Skills
                            </label>
                            <div className="col-sm-10">
                              <textarea
                                type="text"
                                className="form-control"
                                id="skills"
                                name="skills"
                                value={alumniData?.user?.skills}
                                onChange={handleUserChange}
                                placeholder="React.js , Node.js , MongoDB etc."
                                rows="3"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10 mt-3">
                              <button type="submit" className="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div
                        className="tab-pane"
                        id="editGradDate"
                        style={{
                          maxHeight: "117vh",
                          overflowY: "auto", // Enable vertical scrolling
                          overflowX: "hidden", // Prevent horizontal scrolling
                          padding: "15px", // Optional: add padding if needed
                          boxSizing: "border-box", // Ensure padding is included in width calculation
                        }}
                      >
                        <form
                          className="form-horizontal"
                          onSubmit={handleGradSubmit}
                        >
                         
                          <p className="editheading" style={{ marginTop: "0" }}>
                            Update Graduation Details
                          </p>
                          <span style={{ color: "red" }}>
                            <i>
                              Please double-check your graduation year and
                              month. Providing accurate information ensures that
                              your alumni profile is correctly represented,
                              allowing fellow alumni and students to connect
                              with you and enabling accurate referral
                              opportunities.
                            </i>
                          </span>
                          <hr
                            style={{
                              border: "1px solid black",
                              marginBottom: "1.5em",
                              marginTop: "1.5em",
                            }}
                          ></hr>
                          <div className="form-group row">
                           
                            <label
                              htmlFor="inputFullName"
                              className="col-sm-2 col-form-label"
                            >
                              Graduation Month
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="number"
                                className="form-control"
                                id="month"
                                name="graduation_month"
                                value={alumniData?.user?.graduation_month}
                                onChange={handleUserChange}
                                placeholder="Graduation Month"
                                max={12}
                                min={1}
                                style={{ width: "25%" }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              htmlFor="inputHeading"
                              className="col-sm-2 col-form-label"
                            >
                              Graduation Year
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="number"
                                className="form-control"
                                id="year"
                                name="graduation_year"
                                value={alumniData?.user?.graduation_year}
                                onChange={handleUserChange}
                                placeholder="Graduation Year"
                                max={2100}
                                min={1983}
                                style={{ width: "25%" }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10 mt-3">
                              <button type="submit" className="btn btn-danger">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.tab-pane */}
                    </div>
                    {/* /.tab-content */}
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>

          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

export default AlumniProfileContent;
