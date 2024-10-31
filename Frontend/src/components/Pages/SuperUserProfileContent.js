import React, { useContext ,useState , useEffect, useRef , useCallback } from "react";
import "./profile.css"
import axios from 'axios'
import AuthContext from "../../context/AuthContext.js";
import ImageCropper from "../../components/ImageCropper/ImageCropper.js";

const SuperUserProfileContent = () => {
    let { userData, setLoading, showNotification, ShowProfileOfId } =
      useContext(AuthContext);
     console.log("userData", userData);
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id"))
      : null;
    const [user, setUser] = useState(null);
    const [reload, setReload] = useState(false);
    const [posts, setPosts] = useState([]);  // Store posts
    const [page, setPage] = useState(1);     // Keep track of the page number
    const [hasMore, setHasMore] = useState(true);
    const [totalPages,setTotalPages] = useState(1)
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [isImageOpen, setIsImageOpen] = useState(false);
    const [Image,setImage] = useState(null)
    const [load,setload] = useState(false)
  const [croppedImage, setCroppedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const handleCropComplete = (croppedImageUrl) => {
     setCroppedImage(croppedImageUrl);
     
     setIsModalOpen(false);
   };

  const handleImageClick = () => {
    setIsImageOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageOpen(false);
  };

const handleEditClick = (post) => {
  setSelectedPost(post);
  setIsEditModalOpen(true);  // Open the modal
};

   
  
    const [superUserData, setSuperUserData] = useState({
      user: {
        full_name: '',
        About: '',
        Year_Joined: '',
        Branch: '',
        email: '',
        mobile: '',
        linkedin: '',
        Github: '',
        instagram: '',
      },
      profile: {
        user: {
        full_name: '',
        About: '',
        Year_Joined: '',
        Branch: '',
        email: '',
        mobile: '',
        linkedin: '',
        Github: '',
        instagram: '',
        },
        designation:'', 
      },
    });
    
  const calculateAdminProfileCompletion = () => {
    // Define the total number of fields for admin profile
    const totalFields = 11;
    let filledFields = 0;

    // List of fields to check from the user and profile data
    const fieldsToCheck = [
      superUserData.user.full_name,
      superUserData.user.About,
      superUserData.user.Year_Joined,
      superUserData.user.Branch,
      superUserData.user.email,
      superUserData.user.mobile,
      superUserData.user.linkedin,
      superUserData.user.Github,
      superUserData.user.instagram,
      user?.Image,
      superUserData.profile.designation,

    ]; 

    // Check if the fields are not empty or equal to the default values
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

    
    
    useEffect(() => {
      setLoading(true);
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
  
      axios
        .get(
          `http://127.0.0.1:8000/hods/${
            ShowProfileOfId? id : userData?.user_id
          }`,
          {
            headers: {
              Authorization: `Bearer ${token?.access}`,
            },
          }
        )
        .then((response) => {
          setUser(response.data);
          console.log("This is user",response.data);
          if (response.data) {
            setSuperUserData({
              user: {
                full_name: response.data.full_name,
                About: response.data.About,
                Year_Joined: response.data.Year_Joined,
                Branch: response.data.Branch,
                email: response.data.email,
                mobile: response.data.mobile,
                linkedin: response.data.linkedin,
                Github: response.data.Github,
                instagram: response.data.instagram,
              },
              profile: {
                user: {
                  full_name: response.data.full_name,
                  About: response.data.About,
                  Year_Joined: response.data.Year_Joined,
                  Branch: response.data.Branch,
                  email: response.data.email,
                  mobile: response.data.mobile,
                  linkedin: response.data.linkedin,
                  Github: response.data.Github,
                  instagram: response.data.instagram,
                },
                designation: response.data.hod_profile.designation,
              },
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching Admin data:", error);
          setLoading(false);
          showNotification(
            "Error fetching Admin data, please try again.",
            "error",
            "Error"
          );
        });
  localStorage.getItem("id") && localStorage.removeItem("id"); 
       
    }, [userData?.user_id,reload]);
  
  
    console.log("user ", user);
  
  
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
      try {
        const response = await axios.put(`http://127.0.0.1:8000/edit-hod-profile/${id || userData?.user_id}/`, superUserData,{
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        });
        if (response.status === 200) {
          setLoading(false);
          showNotification("Profile updated successfully", "success", "Success");
          if (reload) {
            setReload(false);
          } else {
            setReload(true);
          }
        }
        else {
          setLoading(false);
          showNotification(response.data.detail, "error", "Error");
          if (reload) {
            setReload(false);
          } else {
            setReload(true);
          }
          
        }
  
      } catch (error) {
        console.error('Error updating profile:', error.message);
        setLoading(false);
        showNotification("Error updating profile, please try again.", "error", "Error");
      }
    };
  
    // Handle input changes for user data
    const handleUserChange = (e) => {
      const { name, value } = e.target;
      setSuperUserData((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name]: value // Update the correct field in user
        },
        profile: {
          ...prevState.profile,
          user: {
            ...prevState.profile.user,
            [name]: value // Update the same field in nested user object if needed
          }
        }
      }));
    };
    
    // Handle input changes for profile data
    const handleProfileChange = (e) => {
      const { name, value } = e.target;
      setSuperUserData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: value // Update the correct field in profile
        }
      }));
    };

   
  
  useEffect(() => {
    
      fetchPosts(page); // Fetch the first page of posts when the component mounts
    }, [page]);

   

    const fetchPosts = async (page) => {
       
      try {
        console.log("page " + page);
        const response = await axios.get(`http://127.0.0.1:8000/hodposts/author/${id || userData?.user_id}/?page=${page}&page_size=10`);
        setPosts(response.data.results); // Set fetched posts
        console.log("res data "+response.data.results);
        setHasMore(response.data.next !== null);
         // If 'next' is null, stop loading more posts
         const totalItems = response.data.count;
         setTotalPages(Math.ceil(totalItems / 10));
      } catch (error) {
        console.error('Error fetching posts:', error);
        showNotification("Error fetching posts, please try again.", "error", "Error");
      }
    };
  
   
  
    const formatDate = (isoDate) => {
      const date = new Date(isoDate);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    };

    const handleUpdateSubmit = async (e) => {
      e.preventDefault();
      const accessToken = localStorage.getItem("authTokens")
  ? JSON.parse(localStorage.getItem("authTokens")).access
  : null;
      setLoading(true);
    
      // if ((await verifyaccessToken()) === -1) {
      //   setLoading(false);
      //   return;
      // }

      console.log("post  ",selectedPost?.title ,selectedPost?.content ,selectedPost?.tag, selectedPost?.Image);
    
      if (!selectedPost?.title || !selectedPost?.content || !selectedPost?.tag ) {
        showNotification(
          "Please fill in all fields and upload an image.",
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
        .put(`http://127.0.0.1:8000/hodposts/${selectedPost?.id}/`, formData, {
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
          showNotification(
            error.response?.data?.detail || "Error updating the post.",
            "warning",
            "Update failed"
          );
          setSelectedPost(null)
          setLoading(false);
        });
      };

      const handleDeleteClick = async (post)=>{
        if(!window.confirm('Are You Sure want to Delete Post'))return;
 
        const accessToken = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens")).access
        : null;
            setLoading(true);
         
            try {
             await axios.delete(`http://127.0.0.1:8000/hodposts/${post?.id}/`,{
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
                    <div>
                      Profile Completed : {calculateAdminProfileCompletion()}%
                    </div>
                    <div className="progress progress-sm active">
                      <div
                        className="progress-bar bg-success progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={20}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{
                          width: `${calculateAdminProfileCompletion()}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
                <div className="col-md-3" style={{ fontSize: "0.9em" }}>
                  {/* Profile Image */}
                  <div className="card card-primary card-outline position-relative">
                    {/* Ribbon */}
                    <div className="ribbon-wrapper ribbon-lg">
                      <div className="ribbon bg-primary">
                        {user
                          ? !user?.is_superuser && user?.is_staff
                            ? "Staff"
                            : user.is_superuser
                            ? "Admin"
                            : "User"
                          : "User"}
                      </div>
                    </div>

                    <div className="card-body box-profile">
                      <div className="text-center position-relative">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={
                            user?.Image
                              ? `http://127.0.0.1:8000/${user?.Image}`
                              : `../../dist/img/user1-128x128.jpg`
                          }
                          alt="User profile picture"
                        />

                        {/* Edit Button Overlay */}
                        <button
                          className="btn btn-primary btn-xs position-absolute elevation-2"
                          style={{
                            top: "0px", // Positioning from the top
                            left: "0px", // Positioning from the left
                            borderRadius: "50%",
                            cursor: "pointer", // Pointer cursor
                            zIndex: 10, // Ensure it is above other elements
                          }}
                          onClick={() => setIsModalOpen(true)}
                        >
                          <i
                            className="fas fa-pencil-alt"
                            style={{ cursor: "pointer" }}
                          ></i>
                        </button>
                      </div>

                      {isModalOpen && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "fixed",
                            zIndex: 2000,
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
                              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                              maxWidth: "400px",
                              width: "90%",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            {/* Header Section */}
                            <div
                              style={{
                                backgroundColor: "#343a40", // Dark background for header
                                color: "#fefefe", // Light color for text
                                padding: "10px 20px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "1.5rem",
                                  fontWeight: "bold",
                                }}
                              >
                                Edit Image
                              </p>
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
                            <div
                              style={{ padding: "20px", textAlign: "center" }}
                            >
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
                                backgroundColor: "#343a40", // Light background for footer
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
                                  color: "white",
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

                      <h3 className="profile-username text-center">
                        {user ? user?.full_name || user?.username : "User"}
                      </h3>

                      <hr
                        style={{
                          border: "1px solid #888888",
                          marginBottom: "0.5em",
                          marginTop: "0.5em",
                        }}
                      />
                      <p className="text-muted text-center font">
                        {user?.hod_profile?.designation || "N/A"}
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
                        <i className="fas fa-university mr-1 " /> Department
                      </strong>
                      <p className="text-muted aboutfont">
                        {user?.Branch || "N/A"}
                      </p>

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
                        <i className="fas fa-calendar-alt mr-1" />
                        Joining Year
                      </strong>
                      <p className="text-muted aboutfont">
                        <span className="tag tag-danger">
                          {user?.Year_Joined || "N/A"}
                        </span>{" "}
                        <br />
                      </p>

                      {/* <strong>
                        <i className="fas fa-building mr-1" /> Designation
                      </strong>
                      <p className="text-muted">
                        {user?.hod_profile?.designation || "N/A"}
                      </p> */}
                    </div>
                    {/* /.card-body */}
                  </div>
                  {/* /.card */}
                </div>

                {/* /.col */}
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-header p-2">
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a
                            className="active nav-link"
                            href="#timeline"
                            data-toggle="tab"
                          >
                            Contacts
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="#activity"
                            data-toggle="tab"
                          >
                            Posts
                          </a>
                        </li>
                        {userData?.user_id === user?.id && (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="#settings"
                              data-toggle="tab"
                            >
                              Edit Profile
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>

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
                              {posts.map((post) => (
                                <div key={post.id} className="post">
                                  <div className="user-block">
                                    <img
                                      className="img-circle img-bordered-sm"
                                      src={`http://127.0.0.1:8000/${
                                        user?.Image || "#"
                                      }`}
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
                                      Created at -{" "}
                                      {formatDate(post?.created_at) || "Date"}
                                      <br></br>
                                      <span
                                        className="badge bg-success"
                                        style={{
                                          fontSize: "0.8em",
                                          padding: "0.5em",
                                        }}
                                      >
                                        {" "}
                                        {post?.tag || "Tag"}
                                      </span>
                                    </span>
                                  </div>

                                  {/* Add Edit Icon Here */}
                                  <div
                                    className="edit-icon"
                                    style={{
                                      float: "right",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <i
                                      className="fas fa-edit"
                                      onClick={() => handleEditClick(post)}
                                      style={{
                                        fontSize: "1.5em",
                                        color: "#007bff",
                                      }}
                                    />
                                  </div>

                                  {/* Add Delete Icon Here */}
                                  <div
                                    className="edit-icon"
                                    style={{
                                      float: "right",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <i
                                      className="fas fa-trash"
                                      onClick={() => handleDeleteClick(post)}
                                      style={{
                                        fontSize: "1.5em",
                                        color: "#007bff",
                                      }}
                                    />
                                  </div>

                                  {isEditModalOpen && (
                                    <div className="modal">
                                      <div className="modal-content">
                                        <div className="modal-header">
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
                                                value={
                                                  selectedPost?.title || ""
                                                }
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
                                            <div>
                                              <label>Previous Image</label>
                                            </div>
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
                                                value={
                                                  selectedPost?.DocUrl || ""
                                                }
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
                                    <div className="col-auto">
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
                                    <div className="col-auto">
                                      <a
                                        href={post?.link || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mr-3"
                                      >
                                        <i className="fas fa-link mr-1" /> Link
                                      </a>
                                    </div>
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
                          {/* /.post */}
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane active" id="timeline">
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

                                  <strong>Mobile:</strong>
                                  <p className="text-muted font">
                                    {" "}
                                    {user?.mobile || "N/A"}
                                  </p>

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
                                        {user?.instagram
                                          ? user.instagram
                                          : "N/A"}
                                      </a>
                                    ) : (
                                      "N/A"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {/* END Contact Details Item */}
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
                            <p
                              className="editheading"
                              style={{ marginTop: "0px" }}
                            >
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
                                  value={superUserData?.user?.full_name}
                                  onChange={handleUserChange}
                                  placeholder="Full Name"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label
                                htmlFor="inputLinkedIn"
                                className="col-sm-2 col-form-label"
                              >
                                Department
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Branch"
                                  name="Branch"
                                  value={superUserData?.user?.Branch}
                                  onChange={handleUserChange}
                                  placeholder="CSE, ECE, CIVIL, etc."
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label
                                htmlFor="inputLinkedIn"
                                className="col-sm-2 col-form-label"
                              >
                                Joining Year
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="Year_Joined"
                                  name="Year_Joined"
                                  value={superUserData?.user?.Year_Joined}
                                  onChange={handleUserChange}
                                  placeholder="Year Joined"
                                />
                              </div>
                            </div>

                            <hr
                              style={{
                                border: "1px solid black",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
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
                                  value={superUserData?.user?.email}
                                  onChange={handleUserChange}
                                  placeholder="Email"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Mobile
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="mobile"
                                  name="mobile"
                                  value={superUserData?.user?.mobile}
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
                                  value={superUserData?.user?.linkedin}
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
                                  value={superUserData?.user?.instagram}
                                  onChange={handleUserChange}
                                  placeholder="Instagram profile link"
                                />
                              </div>
                            </div>

                            <hr
                              style={{
                                border: "1px solid black",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                              }}
                            ></hr>
                            <p className="editheading">Professional Profiles</p>
                            <div className="form-group row">
                              <label
                                htmlFor="inputGithub"
                                className="col-sm-2 col-form-label"
                              >
                                Github
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="Github"
                                  name="Github"
                                  value={superUserData?.user?.Github}
                                  onChange={handleUserChange}
                                  placeholder="Github profile link"
                                />
                              </div>
                            </div>

                            <hr
                              style={{
                                border: "1px solid black",
                                marginTop: "0.5rem",
                                marginBottom: "0.5rem",
                              }}
                            ></hr>
                            <p className="editheading">
                              Professional Information
                            </p>
                            <div className="form-group row">
                              <label
                                htmlFor="inputDesignation"
                                className="col-sm-2 col-form-label"
                              >
                                Designation
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="designation"
                                  name="designation"
                                  value={superUserData?.profile?.designation}
                                  onChange={handleProfileChange}
                                  placeholder="Head of Department, etc."
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
                                  value={superUserData?.user?.About}
                                  onChange={handleUserChange}
                                  placeholder="About..."
                                  rows="3"
                                  style={{ resize: "vertical" }}
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <div className="offset-sm-2 col-sm-10 mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-danger"
                                >
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

export default SuperUserProfileContent;
