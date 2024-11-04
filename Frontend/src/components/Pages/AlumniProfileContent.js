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
  console.log("userData", userData);
  
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

  const handleCropComplete = async (croppedImageBlob) => {
    console.log("Cropped Image Data:", croppedImageBlob);

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
        console.log("Image uploaded successfully:", data.detail);
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

  console.log("user ", user);

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
      console.log("Profile updated successfully", response.data);

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
      showNotification(
        "Error updating profile, please try again.",
        "error",
        "Error"
      );
      setLoading(false);
    }
  };

  const fetchPosts = async (page) => {
    try {
      console.log("page " + page);
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
  
    

    console.log("post  ",selectedPost?.title ,selectedPost?.content ,selectedPost?.tag, selectedPost?.Image);
  
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
                <div className="card card-primary card-outline position-relative">
                  {/* Ribbon */}
                  <div className="ribbon-wrapper ribbon-lg">
                    <div className="ribbon bg-primary">
                      {user
                        ? user?.is_alumni
                          ? "Alumni"
                          : user?.is_student
                          ? "Student"
                          : "Admin"
                        : "User"}
                    </div>
                  </div>

                  <div className="card-body box-profile">
                    <div className="text-center postion-relative ">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={
                          user?.Image
                            ? `${baseurl}/${user?.Image}`
                            : `../../dist/img/user1-128x128.jpg`
                        }
                        alt="User profile"
                      />
                      {userData?.user_id === user?.id && (
                        <button
                          className="btn btn-primary btn-xs elevation-2"
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            cursor: "pointer",
                            position: "absolute",
                            top: "10px", // Position at the top
                            left: "10px", // Position at the left
                            zIndex: 10, // Ensure it's on top of the image
                          }}
                          onClick={() => {
                            setIsModalOpen(true);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                      )}
                    </div>
                    <h3 className="profile-username text-center ">
                      {user ? user.full_name || user.username : "User"}
                    </h3>
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
                    <hr
                      style={{
                        border: "1px solid #888888",
                        marginBottom: "0.5em",
                        marginTop: "0.5em",
                      }}
                    />
                    <p className="text-muted text-center font ">
                      {user?.alumni_profile?.Heading || "N/A"}
                    </p>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}

                {/* About Box */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">About</h3>
                  </div>
                  {/* /.card-header */}
                  <div
                    className="card-body"
                    style={{
                      maxHeight: "80vh",
                      overflowX: "auto",
                      overflowY: "auto",
                    }}
                  >
                    <strong>
                      <i className="fas fa-info-circle mr-1" /> About
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.About || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-briefcase mr-1" /> Work
                    </strong>
                    <p className="text-muted workfont aboutfont">
                      <span className="tag tag-success">
                        {user?.Work || "N/A"}
                      </span>
                    </p>

                    <strong>
                      <i className="fas fa-graduation-cap mr-1" /> Education
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.alumni_profile?.Education || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-graduation-cap mr-1" /> Graduation
                      Year:
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.graduation_year || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-code-branch mr-1 " /> Branch
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.Branch || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-map-marker-alt mr-1" /> Location
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.alumni_profile?.current_city || "N/A"},{" "}
                      {user?.alumni_profile?.current_country || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-building mr-1" /> Current Company
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.alumni_profile?.current_company_name || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-building mr-1" /> Role:
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.alumni_profile?.job_title || "N/A"}

                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-building mr-1" /> Previous Companies
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.alumni_profile?.previous_companies ||
                        "No Notes Available"}
                    </p>
                    <strong>
                      <i className="fas fa-briefcase mr-1" /> Years of
                      Experience
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.alumni_profile?.years_of_experience || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-laptop-code mr-1" /> Skills
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.skills || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-industry mr-1" /> Industry
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-danger">
                        {user?.alumni_profile?.industry || "N/A"}
                      </span>{" "}
                      <br />
                    </p>

                    <strong>
                      <i className="fas fa-trophy mr-1" /> Achievements
                    </strong>
                    <p className="text-muted aboutfont">
                      <span className="tag tag-success">
                        {user?.alumni_profile?.achievements ||
                          "No Achievements"}
                      </span>
                    </p>

                    <strong>
                      <i className="fas fa-calendar-alt mr-1" /> Year Joined
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.Year_Joined || "N/A"}
                    </p>
                  </div>
                </div>
                {/* /.card */}
              </div>

              {/* /.col */}
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header p-2">
                    <ul className="nav nav-pills">
                      <li className="nav-item ">
                        <a
                          className="nav-link active"
                          href="#timeline"
                          data-toggle="tab"
                        >
                          Contacts
                        </a>
                      </li>
                      <li className="nav-item ">
                        <a
                          className="nav-link"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Posts
                        </a>
                      </li>

                      {userData?.user_id === user?.id && (
                        <li className="nav-item ">
                          <a
                            className="nav-link"
                            href="#settings"
                            data-toggle="tab"
                          >
                            Edit Profile
                          </a>
                        </li>
                      )}
                      {userData?.user_id === user?.id && (
                        <li className="nav-item ">
                          <a
                            className="nav-link"
                            href="#editGradDate"
                            data-toggle="tab"
                          >
                            Update Graduation Date
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
                                          </div>
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
                                <div className="row">
                                  {/* <div className="col-auto">
                                      <a
                                        href={post?.image_url || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mr-3"
                                      >
                                        <i className="fas fa-image mr-1" />{" "}
                                        Image
                                      </a>
                                    </div> */}

                                  <div className="col-auto mt-3">
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleImageClick();
                                      }}
                                      className="mr-3"
                                    >
                                      <i className="fas fa-image mr-1" /> Image
                                    </a>

                                    {isImageOpen && (
                                      <div
                                        style={{
                                          position: "fixed",
                                          top: 0,
                                          left: 0,
                                          width: "100%",
                                          height: "100%",
                                          backgroundColor: "tranparent",
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
                                            src={post?.Image}
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
                                  {post?.DocUrl && (
                                    <div className="col-auto mt-3">
                                      <a
                                        href={post?.DocUrl || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mr-3"
                                      >
                                        <i className="fas fa-file-alt mr-1" />{" "}
                                        Document
                                      </a>
                                    </div>
                                  )}

                                  {post?.link && (
                                    <div className="col-auto mt-3">
                                      <a
                                        href={post?.link || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mr-3"
                                      >
                                        <i className="fas fa-link mr-1" /> Link
                                      </a>
                                    </div>
                                  )}
                                </div>
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
                        {/* The timeline */}
                        <div className="timeline timeline-inverse">
                          {/* timeline time label */}
                          {/* timeline time label */}
                          <div className="time-label">
                            <span className="bg-danger">Contact Details</span>
                          </div>
                          {/* / Contact-label */}
                          {/* Contact Details Item */}
                          <div>
                            <i className="fas fa-address-book bg-primary" />
                            <div className="timeline-item">
                              <div className="timeline-body">
                                <strong>Email:</strong>
                                <p className="text-muted font">
                                  {user?.email || "N/A"}
                                </p>

                                {/* <strong>Mobile:</strong>
                                <p className="text-muted font">
                                  {user?.mobile || "N/A"}
                                </p> */}

                                <strong>LinkedIn:</strong>
                                <p className="text-muted font">
                                  {user?.linkedin ? (
                                    <a
                                      href={user?.linkedin || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.linkedin ? user.linkedin : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>GitHub:</strong>
                                <p className="text-muted font">
                                  {user?.Github ? (
                                    <a
                                      href={user?.Github || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.Github ? user.Github : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>Instagram:</strong>
                                <p className="text-muted font">
                                  {user?.instagram ? (
                                    <a
                                      href={user?.instagram || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.instagram ? user.instagram : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>
                                <hr
                                  style={{
                                    border: "1px solid #888888",
                                    marginBottom: "0.5em",
                                    marginTop: "0.5em",
                                  }}
                                />
                                <strong>Preferred Contact:</strong>
                                <p className="text-muted font">
                                  {user?.alumni_profile.preferred_contact_method
                                    ? capitalizeFirstLetter(
                                        user.alumni_profile
                                          .preferred_contact_method
                                      )
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="time-label">
                            <span className="bg-danger">
                              Portfolio & Resume
                            </span>
                          </div>
                          <div>
                            <i className="fas fa-address-book bg-primary" />
                            <div className="timeline-item">
                              <div className="timeline-body">
                                <strong>Portfolio:</strong>
                                <p className="text-muted font">
                                  {user?.portfolio_link ? (
                                    <a
                                      href={user?.portfolio_link || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.portfolio_link
                                        ? user.portfolio_link
                                        : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>

                                <strong>Resume:</strong>
                                <p className="text-muted font">
                                  {user?.resume_link ? (
                                    <a
                                      href={user?.resume_link || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {user?.resume_link
                                        ? user.resume_link
                                        : "N/A"}
                                    </a>
                                  ) : (
                                    "N/A"
                                  )}
                                </p>
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
                            Modify Graduation Details
                          </p>
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
                                name="month"
                                value={alumniData?.user?.full_name}
                                onChange={handleUserChange}
                                placeholder="Graduation Month"
                                max={12}
                                min={1}
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
                                name="year"
                                value={alumniData?.profile?.Education}
                                onChange={handleProfileChange}
                                placeholder="Graduation Year"
                                max={2100}
                                min={1983}
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
