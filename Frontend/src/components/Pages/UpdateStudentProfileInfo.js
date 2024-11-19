import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import baseurl from "../const.js";
import { useParams } from "react-router-dom";


const UpdateStudentProfileInfoContent = () => {
  const [loading, setLoading] = useState(false);
  const { id, username, graduation_year } = useParams();
  
  let { showNotification, message, icon, title, handleClose, isOpen } =
    useContext(AuthContext);

  const [userdata, setUserData] = useState({});
  const [studentdata, setStudentProfileData] = useState({});

 const [formData, setFormData] = useState({
   full_name: "",
   Education: "",
   Branch: "",
   current_year_of_study: "",
   email: "",
   mobile: "",
   linkedin: "",
   instagram: "",
   Github: "",
   portfolio_link: "",
   resume_link: "",
   Heading: "",
   About: "",
   Work: "",
   skills: "",
 });
  const getUserData = async (userId, username, graduationYear) => {
    setLoading(true);
  
    try {
      const response = await axios.get(
        `${baseurl}/student-profile/${userId}/${username}/${graduationYear}/`,
      );

      if (response.status === 200) {
        // Assuming response.data contains user and student_profile
        const userData = response.data.user;
        const studentProfileData = response.data.student_profile;
        
        setUserData(userData);
        setStudentProfileData(studentProfileData);

        setFormData({
          full_name: userData.full_name,
          Education: studentProfileData.Education,
          Branch: userData.Branch,
          current_year_of_study: studentProfileData.current_year_of_study,
          email: userData.email,
          mobile: userData.mobile,
          linkedin: userData.linkedin,
          instagram: userData.instagram,
          Github: userData.Github,
          portfolio_link: userData.portfolio_link,
          resume_link: userData.resume_link,
          Heading: studentProfileData.Heading,
          About: userData.About,
          Work: userData.Work,
          skills: userData.skills,
        });
        
      } else {
        console.log('Error loading student profile');
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setLoading(false);
      
      if (error.response && error.response.data) {
        const { detail } = error.response.data;
        showNotification(
          detail || "Error fetching user data",
          "error",
          "Error"
        );
      } else {
        showNotification(
          "Error fetching user data, please try again.",
          "error",
          "Error"
        );
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    localStorage.removeItem("authTokens");
    getUserData(id, username, graduation_year);
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   const handleSubmit = async (e) => {
     e.preventDefault();

     setLoading(true);
     try {
       const response = await axios.put(
         `${baseurl}/student-profile/${id}/${username}/${graduation_year}/`,
         formData
       );

       if (response.status === 200) {
         showNotification(
           "Profile updated successfully!",
           "success",
           "Success"
         );
       } else {
         showNotification(
           response.data.detail || "Unexpected warning response",
           "warning",
           "Warning"
         );
       }
     } catch (error) {
       // Ensure error details are accessed safely
       const errorDetail =
         error.response?.data?.detail || "An error occurred. Please try again.";
       console.error("Error updating profile:", error);
       showNotification(errorDetail, "warning", "Warning");
     } finally {
       setLoading(false);
     }
   };

  return (
    <section className="content">
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <div className="container-fluid">
        <div className="row">
          {/* Left column */}
          <div className="col-md-12">
            {/* General form elements */}
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Update Student Profile</h3>
              </div>
              {/* /.card-header */}
              {/* Form start */}
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Full Name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="education">Education</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Education"
                      placeholder="Education"
                      name="Education"
                      value={formData.Education}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Branch">Branch</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Branch"
                      placeholder="Branch"
                      name="Branch"
                      value={formData.Branch}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="academic_year">Academic Year</label>
                    <input
                      type="number"
                      className="form-control"
                      id="current_year_of_study"
                      placeholder="Academic Year"
                      name="current_year_of_study"
                      value={formData.current_year_of_study}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mobile">Mobile No.</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      placeholder="Mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      pattern="\d{10}"
                      title="Please enter exactly 10 digits"
                    />
                  </div>

                  {/* New fields */}
                  <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                      type="text"
                      className="form-control"
                      id="linkedin"
                      placeholder="LinkedIn Profile URL"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="instagram">Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      id="instagram"
                      placeholder="Instagram Profile URL"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="Github">GitHub</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Github"
                      placeholder="GitHub Profile URL"
                      name="Github"
                      value={formData.Github}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="portfolio_link">Portfolio Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="portfolio_link"
                      placeholder="Portfolio URL"
                      name="portfolio_link"
                      value={formData.portfolio_link}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="resume_link">Resume Link</label>
                    <input
                      type="text"
                      className="form-control"
                      id="resume_link"
                      placeholder="Resume URL"
                      name="resume_link"
                      value={formData.resume_link}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="heading">Heading</label>
                    <textarea
                      className="form-control"
                      id="Heading"
                      placeholder="Heading"
                      name="Heading"
                      value={formData.Heading}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="about">About</label>
                    <textarea
                      className="form-control"
                      id="About"
                      placeholder="About"
                      name="About"
                      value={formData.About}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="about">Work</label>
                    <textarea
                      className="form-control"
                      id="Work"
                      placeholder="Work Experience"
                      name="Work"
                      value={formData.Work}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="about">Skills</label>
                    <input
                      type="text"
                      className="form-control"
                      id="skills"
                      placeholder="Skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* /.card-body */}
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
            {/* /.card */}
          </div>
        </div>
        {/* /.row */}
      </div>
    </section>
  );
};




const UpdateStudentProfileInfo = () => {
  return (
    <Home
      DynamicContent={UpdateStudentProfileInfoContent}
      url="update_Student_profile_info"
      heading="Update Student Profile Info"
    />
  );
};

export default UpdateStudentProfileInfo;
