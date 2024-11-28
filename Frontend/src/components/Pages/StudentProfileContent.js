import React, { useContext ,useState , useEffect } from "react";
import "./profile.css"
import axios from 'axios'
import AuthContext from "../../context/AuthContext.js";
import baseurl from "../const.js";
import ImageCropper from "../../components/ImageCropper/ImageCropper";


const StudentProfileContent = () => {
    let {
      userData,
      showNotification,
      setLoading,
      setIsAllAdminPage,
      toggleimageRefresh,
    } = useContext(AuthContext);
    
   
    const id = localStorage.getItem("id");
    const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
   const toggleReload = () => {
     setReload(!reload);
   };
    useEffect(() => {
      setIsAllAdminPage(false);
    }, []);
  
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
    const [studentData, setStudentData] = useState({
      user: {
        username: "",
        full_name: "",
        About: "",
        Work: "",
        Year_Joined: "",
        graduation_month: "",
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
          username: "",
          full_name: "",
          About: "",
          Work: "",
          Year_Joined: "",
          graduation_month: "",
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
        Heading: "",
        Education: "",
        current_year_of_study: "",
      },
    });
    
  const calculateStudentProfileCompletion = () => {
    // Define the total number of fields you are checking for
    const totalFields = 17; // Update this if you add or remove fields
    let filledFields = 0;

    // List of fields to check from the user and profile data
    const fieldsToCheck = [
      studentData.user.full_name,
      studentData.user.About,
      studentData.user.Work,
      user?.Image,
      studentData.user.Year_Joined,
      studentData.user.graduation_month,
      studentData.user.graduation_year,
      studentData.user.Branch,
      studentData.user.email,
      studentData.user.mobile,
      studentData.user.linkedin,
      studentData.user.Github,
      studentData.user.instagram,
      studentData.user.portfolio_link,
      studentData.user.resume_link,
      studentData.user.skills,
      studentData.profile.Heading,
      studentData.profile.Education,
      studentData.profile.current_year_of_study,
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

    useEffect(() => {
      setLoading(true);
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
      
      axios
        .get(`${baseurl}/students/${id || userData?.user_id}`, {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          if (response.data) {
            setStudentData({
              user: {
                full_name: response.data.full_name,
                About: response.data.About,
                Work: response.data.Work,
                Year_Joined: response.data.Year_Joined,
                graduation_month: response.data.graduation_month,
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
                  full_name: response.data.full_name,
                  About: response.data.About,
                  Work: response.data.Work,
                  Year_Joined: response.data.Year_Joined,
                  graduation_month: response.data.graduation_month,
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
                Heading: response.data.student_profile?.Heading,
                Education: response.data.student_profile?.Education,
                current_year_of_study:
                  response.data.student_profile?.current_year_of_study,
              },
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching Students data:", error);
          showNotification(
            "Error fetching Students data, please try again.",
            "error",
            "Error"
          );
          setLoading(false);
        });
       
    }, [userData?.user_id, reload]);
  
   
  
  
      // Function to handle form submission
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const token = localStorage.getItem("authTokens")
          ? JSON.parse(localStorage.getItem("authTokens"))
          : null;
        try {
          const response = await axios.put(
            `${baseurl}/edit-student-profile/${id || userData?.user_id}/`,
            studentData,
            {
              headers: {
                Authorization: `Bearer ${token?.access}`,
              },
            }
          );
          if (response.status === 200) {
            setLoading(false);
            if (reload) {
              setReload(false);
            } else {
              setReload(true);
            }
            showNotification(
              "Profile updated successfully!",
              "success",
              "Success"
            );
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

    const handleGradSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
     
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based
      if(studentData?.user?.graduation_year === "" || studentData?.user?.graduation_month === "") {
        showNotification(
          "Please enter graduation year and month.",
          "warning",
          "Warning"
        );
        setLoading(false);
        return;
      }
      const gradYear = parseInt(studentData?.user?.graduation_year);
      const gradMonth = parseInt(studentData?.user?.graduation_month);

      try {
        const response = await axios.put(
          `${baseurl}/edit-student-profile/${
            id || userData?.user_id
          }/`,
          studentData,
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
          } else {
            showNotification(
              "You are assigned with the Alumni profile.",
              "success",
              "Profile Updated to Alumni"
            );
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

    
      // Handle input changes for user data
      const handleUserChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevState) => ({
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
        setStudentData((prevState) => ({
          ...prevState,
          profile: {
            ...prevState.profile,
            [name]: value // Update the correct field in profile
          }
        }));
      };
    
  
  
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
                      Profile Completed : {calculateStudentProfileCompletion()}%
                    </div>
                    <div className="progress progress-sm active">
                      <div
                        className="progress-bar bg-success progress-bar-striped"
                        role="progressbar"
                        aria-valuenow={20}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{
                          width: `${calculateStudentProfileCompletion()}%`,
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
                          ? user.is_alumni
                            ? "Alumni"
                            : user.is_student
                            ? "Student"
                            : "College"
                          : "User"}
                      </div>
                    </div>

                    <div className="card-body box-profile">
                      <div className="text-center position-relative">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={
                            user?.Image
                              ? `${baseurl}/${user?.Image}`
                              : `../../dist/img/user1-128x128.jpg`
                          }
                          alt="User profile picture"
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
                              top: "0px", // Position at the top
                              left: "0px", // Position at the left
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
                      <h3 className="profile-username text-center">
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
                      <p className="text-muted text-center font">
                        {user?.student_profile?.Heading || "N/A"}
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
                        <span className="tag tag-danger aboutfont ">
                          {user?.About || "N/A"}
                        </span>
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
                        <i className="fas fa-laptop-code mr-1" /> Skills
                      </strong>
                      <p className="text-muted aboutfont">
                        <span className="tag tag-danger">
                          {user?.skills || "N/A"}
                        </span>
                      </p>

                      <strong>
                        <i className="fas fa-code-branch mr-1" /> Branch
                      </strong>
                      <p className="text-muted aboutfont">
                        <span className="tag tag-danger">
                          {user?.Branch || "N/A"}
                        </span>
                      </p>

                      <strong>
                        <i className="fas fa-graduation-cap mr-1" /> Education
                      </strong>
                      <p className="text-muted aboutfont">
                        {user?.student_profile?.Education || "N/A"}, <br></br>
                      </p>

                      <strong>
                        <i className="fas fa-calendar-alt mr-1" /> Adminssion
                        Year
                      </strong>

                      <p className="text-muted aboutfont">
                        {user?.Year_Joined || "N/A"}
                      </p>

                      <strong>
                        <i className="fas fa-calendar-alt mr-1" /> Academic Year
                      </strong>
                      <p className="text-muted aboutfont">
                        {user?.student_profile?.current_year_of_study || "N/A"}
                      </p>

                      <strong>
                        <i className="fas fa-calendar-alt mr-1" /> Graduation
                        Month & Year (MM/YYYY)
                      </strong>
                      <p className="text-muted aboutfont">
                        {user?.graduation_month && user?.graduation_year
                          ? `${user.graduation_month}/${user.graduation_year}`
                          : "N/A"}
                      </p>

                      {/* <strong>
                          <i className="fas fa-link mr-1" /> LinkedIn
                        </strong>
                        <p className="text-muted">
                          <a href={user?.linkedin || "#"}>{user?.linkedin || "N/A"}</a>
                        </p>
                        
  
                        <strong>
                          <i className="fas fa-code-branch mr-1" /> Github
                        </strong>
                        <p className="text-muted">
                          <a href={user?.Github || "#"}>{user?.Github || "N/A"}</a>
                        </p>
                        
  
                        <strong>
                          <i className="fas fa-camera mr-1" /> Instagram
                        </strong>
                        <p className="text-muted">
                          <a href={user?.instagram || "#"}>{user?.instagram || "N/A"}</a>
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
                            href="#contacts"
                            data-toggle="tab"
                          >
                            <i className="fas fa-address-book mr-1"></i>{" "}
                            Contacts
                          </a>
                        </li>
                        {userData?.user_id === user?.id && (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="#edit"
                              data-toggle="tab"
                            >
                              <i className="fas fa-user-edit mr-1"></i> Edit
                              Profile
                            </a>
                          </li>
                        )}

                        {/* {userData?.user_id === user?.id && (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="#updateGraduation"
                              data-toggle="tab"
                              onClick={() =>
                                showNotification(
                                  "Your profile will change based on your graduation date. If it’s the same or after today, you’ll be a Student. If it’s before today, you’ll be an Alumni.",
                                  "info",
                                  "Graduation Details"
                                )
                              }
                            >
                              Graduation Details
                            </a>
                          </li>
                        )} */}
                      </ul>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="tab-content">
                        {/* /.tab-pane */}
                        <div className="active tab-pane" id="contacts">
                          {/* The timeline */}
                          <div className="timeline timeline-inverse">
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
                                    {user?.linkedin !== "N/A" ? (
                                      <a
                                        href={
                                          user?.linkedin?.startsWith("http")
                                            ? user.linkedin
                                            : user?.linkedin
                                            ? `https://${user.linkedin}`
                                            : "#"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {user?.linkedin}
                                      </a>
                                    ) : (
                                      "N/A"
                                    )}
                                  </p>

                                  <strong>GitHub:</strong>
                                  <p className="text-muted font">
                                    {user?.Github !== "N/A" ? (
                                      <a
                                        href={
                                          user?.Github?.startsWith("http")
                                            ? user.Github
                                            : user?.Github
                                            ? `https://${user.Github}`
                                            : "#"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {user?.Github}
                                      </a>
                                    ) : (
                                      "N/A"
                                    )}
                                  </p>

                                  <strong>Instagram:</strong>
                                  <p className="text-muted font">
                                    {user?.instagram !== "N/A" ? (
                                      <a
                                        href={
                                          user?.instagram?.startsWith("http")
                                            ? user.instagram
                                            : user?.instagram
                                            ? `https://${user.instagram}`
                                            : "#"
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {user?.instagram }
                                      </a>
                                    ) : (
                                      "N/A"
                                    )}
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
                                    {user?.portfolio_link !== "N/A" ? (
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
                                    {user?.resume_link !== "N/A" ? (
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
                            {/* END Contact Details Item */}
                          </div>
                        </div>
                        {/* /.tab-pane */}

                        {/* /.tab-pane */}
                        <div
                          className="tab-pane"
                          id="edit"
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
                            onSubmit={handleSubmit}
                          >
                            <div className="form-group row">
                              <p
                                className="editheading"
                                style={{ marginTop: "0" }}
                              >
                                Personal Information
                              </p>
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
                                  value={studentData?.user?.full_name}
                                  onChange={handleUserChange}
                                  placeholder="Full Name"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Education
                              </label>
                              <div className="col-sm-10">
                                <textarea
                                  type="text"
                                  id="Education"
                                  className="form-control"
                                  name="Education"
                                  value={studentData.profile.Education}
                                  onChange={handleProfileChange}
                                  placeholder="BE in CSE, etc"
                                  rows="3"
                                  style={{ resize: "vertical" }}
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Branch
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  id="Branch"
                                  className="form-control"
                                  name="Branch"
                                  value={studentData.user.Branch}
                                  onChange={handleUserChange}
                                  placeholder="CSE, ECE, etc"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Academic Year
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="number"
                                  id="current_year_of_study"
                                  className="form-control"
                                  name="current_year_of_study"
                                  value={
                                    studentData.profile.current_year_of_study
                                  }
                                  onChange={handleProfileChange}
                                  placeholder="Academic Year"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Admission Year
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="number"
                                  id="Year_Joined"
                                  className="form-control"
                                  name="Year_Joined"
                                  value={studentData.user.Year_Joined}
                                  onChange={handleUserChange}
                                  placeholder="Admission Year"
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
                            <p className="editheading">Contact Information</p>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Email
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="email"
                                  id="email"
                                  className="form-control"
                                  name="email"
                                  value={studentData.user.email}
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
                                  value={studentData?.user?.mobile}
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
                              <label className="col-sm-2 col-form-label">
                                LinkedIn
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  id="linkedin"
                                  className="form-control"
                                  name="linkedin"
                                  value={studentData.user.linkedin}
                                  onChange={handleUserChange}
                                  placeholder="Linkedin profile link"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Instagram
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  id="instagram"
                                  className="form-control"
                                  name="instagram"
                                  value={studentData.user.instagram}
                                  onChange={handleUserChange}
                                  placeholder="Instagram profile link"
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

                            <p className="editheading">Professional Profiles</p>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Github
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  id="Github"
                                  className="form-control"
                                  name="Github"
                                  value={studentData.user.Github}
                                  onChange={handleUserChange}
                                  placeholder="Github profile link"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Portfolio Link
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  id="portfolio_link"
                                  className="form-control"
                                  name="portfolio_link"
                                  value={studentData.user.portfolio_link}
                                  onChange={handleUserChange}
                                  placeholder="Portfolio link"
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Resume Link
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  id="resume_link"
                                  className="form-control"
                                  name="resume_link"
                                  value={studentData.user.resume_link}
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

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Heading
                              </label>
                              <div className="col-sm-10">
                                <textarea
                                  type="text"
                                  id="Heading"
                                  className="form-control"
                                  name="Heading"
                                  value={studentData.profile.Heading}
                                  onChange={handleProfileChange}
                                  placeholder="Python | Django | DRF | Full Stack Developer | and Passionate Problem Solver etc."
                                  rows="3"
                                  style={{ resize: "vertical" }}
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                About
                              </label>
                              <div className="col-sm-10">
                                <textarea
                                  type="text"
                                  id="About"
                                  className="form-control"
                                  name="About"
                                  value={studentData.user.About}
                                  onChange={handleUserChange}
                                  placeholder="Passionate Full Stack Developer | Python & Django Enthusiast ... etc..."
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Work
                              </label>
                              <div className="col-sm-10">
                                <textarea
                                  type="text"
                                  id="Work"
                                  className="form-control"
                                  name="Work"
                                  value={studentData.user.Work}
                                  onChange={handleUserChange}
                                  placeholder=" Work experience, projects and certifications etc.."
                                  row="3"
                                  style={{ resize: "vertical" }}
                                />
                              </div>
                            </div>

                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Skills
                              </label>
                              <div className="col-sm-10">
                                <textarea
                                  type="text"
                                  className="form-control"
                                  id="skills"
                                  name="skills"
                                  value={studentData.user.skills}
                                  onChange={handleUserChange}
                                  placeholder="Python , Django , DRF , etc.. "
                                  rows="3"
                                  style={{ resize: "vertical" }}
                                />
                              </div>
                            </div>

                            <div className="form-group row ">
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

                        <div
                          className="tab-pane"
                          id="updateGraduation"
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
                            <p
                              className="editheading"
                              style={{ marginTop: "0" }}
                            >
                              Update Graduation Details
                            </p>
                            <span style={{ color: "red" }}>
                              <i>
                                Please double-check your graduation year and
                                month. Incorrect information could impact your
                                career, as alumni won’t be able to access your
                                data or provide referrals.
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
                                  value={studentData?.user?.graduation_month}
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
                                  value={studentData?.user?.graduation_year}
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

  export default StudentProfileContent;



