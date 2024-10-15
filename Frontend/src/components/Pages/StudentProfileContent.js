import React, { useContext ,useState , useEffect, useRef , useCallback } from "react";
import "./profile.css"
import axios from 'axios'
import AuthContext from "../../context/AuthContext.js";




const StudentProfileContent = () => {
    let { userData, showNotification,setLoading } = useContext(AuthContext);
    console.log("userData", userData);
    const id = localStorage.getItem("id")
      ? JSON.parse(localStorage.getItem("id"))
      : null;
    const [user, setUser] = useState(null);
    const [reload, setReload] = useState(false);
  
    const [studentData, setStudentData] = useState({
      user: {
        username: "",
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
        skills: ""
      },
      profile: {
        user: {
          username: "",
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
          skills: ""
        },
        Heading: "",
        Education: "",
        current_year_of_study: ""
      }
    });
    
  
    useEffect(() => {
      setLoading(true);
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
  
      axios
        .get(`http://127.0.0.1:8000/students/${id || userData?.user_id}`, {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        })
        .then((response) => {
          setUser(response.data);
            if(response.data){
                setStudentData({
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
                    Heading: response.data.student_profile?.Heading,
                    Education: response.data.student_profile?.Education,
                    current_year_of_study: response.data.student_profile?.current_year_of_study,                
                  }
  
                })
                setLoading(false);
            }
        })
        .catch((error) => {
          console.error("Error fetching Students data:", error);
          showNotification( "Error fetching Students data, please try again.", "error", "Error");
          setLoading(false);
        });
        localStorage.getItem("id") && localStorage.removeItem("id"); 
    }, [userData?.user_id, reload]);
  
    console.log("user ", user);
  
  
      // Function to handle form submission
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const token = localStorage.getItem("authTokens")
          ? JSON.parse(localStorage.getItem("authTokens"))
          : null;
        try {
          const response = await axios.put(`http://127.0.0.1:8000/edit-student-profile/${id || userData?.user_id}/`, studentData,{
            headers: {
              Authorization: `Bearer ${token?.access}`,
            },
          });
          if (response.status === 200) {
            setLoading(false);
            if (reload) {
              setReload(false);
            } else {
              setReload(true);
            }
            showNotification("Profile updated successfully!", "success", "Success");
          }
        
        } catch (error) {
          console.error('Error updating profile:', error.message);
          showNotification( "Error updating profile, please try again.", "error", "Error");
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
                      <div className="text-center">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={"../../dist/img/user4-128x128.jpg"}
                          alt="User profile picture"
                        />
                      </div>
                      <h3 className="profile-username text-center">
                        {user ? user.full_name || user.username : "User"}
                      </h3>
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
                        <i className="fas fa-calendar-alt mr-1" /> Adminssion Year
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
                        <i className="fas fa-calendar-alt mr-1" /> Graduation Year
                      </strong>
                      <p className="text-muted aboutfont">
                        {user?.graduation_year || "N/A"}
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
                            Contacts
                          </a>
                        </li>
                        { userData?.user_id===user?.id && (
                          <li className="nav-item">
                          <a className="nav-link" href="#edit" data-toggle="tab">
                            Edit Profile
                          </a>
                        </li>
                        )}
                        
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
  
                                  <strong>Mobile:</strong>
                                  <p className="text-muted font">
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
                                        {user?.instagram ? user.instagram : "N/A"}
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
  
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Graduation Year
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="number"
                                  id="graduation_year"
                                  className="form-control"
                                  name="graduation_year"
                                  value={studentData.user.graduation_year}
                                  onChange={handleUserChange}
                                  placeholder="Graduation Year"
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
                                  type="url"
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
                                  type="url"
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
                                  type="url"
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
                                  type="url"
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
                                  type="url"
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

  export default StudentProfileContent;



