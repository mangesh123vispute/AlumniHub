import React, { useContext ,useState , useEffect, useRef , useCallback } from "react";
import "./profile.css"
import axios from 'axios'
import AuthContext from "../../context/AuthContext.js";


const AlumniProfileContent = () => {
  
    let { userData,setLoading,showNotification } = useContext(AuthContext);
    console.log("userData", userData);
    const [user, setUser] = useState(null);
    
    
    const [show, setShow] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 1 });
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [uploading, setUploading] = useState(false);
  
  
    const id = localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : null
    const [reload, setReload] = useState(false);
    const [alumniData, setAlumniData] = useState({
      user: {
        // username: '',
        full_name: '',
        About: '',
        Work: '',
        Year_Joined: '',
        graduation_year: '',
        Branch: '',
        email: '',
        mobile: '',
        linkedin: '',
        Github: '',
        instagram: '',
        portfolio_link: '',
        resume_link: '',
        skills: ''
      },
      profile: {
        user:{
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
          skills: user?.skills
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
        preferred_contact_method: user?.alumni_profile?.preferred_contact_method
      }
    });
    
    useEffect(() => {
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
      setLoading(true);
      axios
        .get(`http://127.0.0.1:8000/getalumni/${ id || userData?.user_id}`, {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        })
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
                    current_company_name: response.data.alumni_profile?.current_company_name,
                    job_title: response.data.alumni_profile?.job_title,
                    Education: response.data.alumni_profile?.Education,
                    current_city: response.data.alumni_profile?.current_city,
                    current_country: response.data.alumni_profile?.current_country,
                    years_of_experience: response.data.alumni_profile?.years_of_experience,
                    industry: response.data.alumni_profile?.industry,
                    achievements: response.data.alumni_profile?.achievements,
                    previous_companies: response.data.alumni_profile?.previous_companies,
                    preferred_contact_method: response.data.alumni_profile?.preferred_contact_method,
              }
                })
            
                setLoading(false);
              }
        })
        .catch((error) => {
          console.error("Error fetching alumni data:", error);
          showNotification( "Error fetching alumni data, please try again.", "error", "Error");
          setLoading(false);
        });
        localStorage.getItem("id") && localStorage.removeItem("id") 
    }, [userData?.user_id,reload]);
  
    console.log("user ", user);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
       
      try {
        const response = await axios.put(`http://127.0.0.1:8000/edit-alumni-profile/${id || userData?.user_id}/`, alumniData,{
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        });
        console.log('Profile updated successfully', response.data);
  
        if (response.status === 200) {
          setLoading(false);
          showNotification(response.data.detail || "Profile updated successfully.", "success", "Success");
          if(reload){
            setReload(false);
          } else {
            setReload(true);
          }
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
      setAlumniData((prevState) => ({
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
      setAlumniData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: value // Update the correct field in profile
        }
      }));
    };
  
  
    function capitalizeFirstLetter(str) {
      if (!str) return ""; // Handle empty or undefined strings
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
  
  
    // Show or hide modal
  
    // Handle open/close modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    // Handle image selection
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageSrc(reader.result);
          handleShow(); // Open modal after image selection
        };
        reader.readAsDataURL(file);
      }
    };
  
    // Capture crop completion details
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
    }, []);
  
    // Create cropped image
    const getCroppedImage = async (imageSrc, crop) => {
      const image = new Image();
      image.src = imageSrc;
      return new Promise((resolve) => {
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const scaleX = image.naturalWidth / image.width;
          const scaleY = image.naturalHeight / image.height;
          canvas.width = crop.width;
          canvas.height = crop.height;
          const ctx = canvas.getContext('2d');
  
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
          );
  
          canvas.toBlob((blob) => {
            const croppedUrl = URL.createObjectURL(blob);
            resolve(croppedUrl);
          }, 'image/jpeg');
        };
      });
    };
  
    // Handle crop and set cropped image URL
    const handleCrop = async () => {
      if (croppedAreaPixels) {
        const croppedUrl = await getCroppedImage(imageSrc, croppedAreaPixels);
        setCroppedImageUrl(croppedUrl);
      }
      handleClose();
    };
    // Handle upload
    const handleUpload = async () => {
      setUploading(true);
      const formData = new FormData();
      formData.append('profile_picture', croppedImageUrl);
  
      const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
  
      try {
        
        const response = await axios.put(
         `http://127.0.0.1:8000/update-image/${userData?.user_id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token?.access}`,
            },
          }
        );
        if (response.status === 200) {
          showNotification(response.data.detail || "Profile updated successfully.", "success", "Success");
          // You can refresh the user data here or perform any other updates.
        }
      } catch (error) {
        console.error("Error uploading the image: ", error);
        showNotification("Failed to upload the image, please try again.", "error", "Error");
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <>
        <div>
          {/* Content Header (Page header) */}
  
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3 " style={{ fontSize: "0.9em" }}>
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
                            : "Admin"
                          : "User"}
                      </div>
                    </div>
  
                    <div className="card-body box-profile">
                      {/* <div className="text-center">
                        <img
                          className="profile-user-img img-fluid img-circle"
                          src={
                            user?.alumni_profile?.profile_picture_url ||
                            "../../dist/img/user4-128x128.jpg"
                          }
                          alt="User profile picture"
                        />
                      </div> */}
                     <div className="text-center">
        <img
          className="profile-user-img img-fluid img-circle"
          src={user?.Image ? `http://127.0.0.1:8000/${user?.Image}` : `../../dist/img/user1-128x128.jpg`}
          alt="User profile"
        />
        <button className="btn btn-primary mt-2" onClick={() => document.getElementById('imageInput').click()}>
          <i className="fas fa-edit"></i> Edit Profile Picture
        </button>
  
      
        {/* Cropped Image Preview */}
        {croppedImageUrl && (
          <div>
            <img src={croppedImageUrl} alt="Cropped" className="img-thumbnail mt-3" />
            <button className="btn btn-success mt-2" onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        )}
  
        {/* File input (hidden) */}
        <input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      </div>
                      <h3 className="profile-username text-center ">
                        {user ? user.full_name || user.username : "User"}
                      </h3>
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
                        {user?.alumni_profile?.current_city || "N/A"}, { user?.alumni_profile?.current_country || "N/A"}
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
                            href="#activity"
                            data-toggle="tab"
                          >
                            Posts
                          </a>
                        </li>
                        <li className="nav-item ">
                          <a
                            className="nav-link"
                            href="#timeline"
                            data-toggle="tab"
                          >
                            Contacts
                          </a>
                        </li>
                        {userData?.user_id === user?.id && (<li className="nav-item ">
                          <a
                            className="nav-link"
                            href="#settings"
                            data-toggle="tab"
                          >
                            Edit Profile
                          </a>
                        </li>) }
                       
                      </ul>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="tab-content">
                        <div className="active tab-pane" id="activity">
                          {/* Post */}
                          <div className="post">
                            <div className="user-block">
                              <img
                                className="img-circle img-bordered-sm"
                                src="../../dist/img/user1-128x128.jpg"
                                alt="user image"
                              />
                              <span className="username">
                                <a href="#">Jonathan Burke Jr.</a>
                                <a href="#" className="float-right btn-tool">
                                  <i className="fas fa-times" />
                                </a>
                              </span>
                              <span className="description">
                                Shared publicly - 7:30 PM today
                              </span>
                            </div>
                            {/* /.user-block */}
                            <p className="postfont">
                              Lorem ipsum represents a long-held tradition for
                              designers, typographers and the like. Some people
                              hate it and argue for its demise, but others ignore
                              the hate as they create awesome tools to help create
                              filler text for everyone from bacon lovers to
                              Charlie Sheen fans.
                            </p>
                            <p>
                              <a href="#" className="link-black text-sm mr-2">
                                <i className="fas fa-share mr-1" /> Share
                              </a>
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-thumbs-up mr-1" /> Like
                              </a>
                              <span className="float-right">
                                <a href="#" className="link-black text-sm">
                                  <i className="far fa-comments mr-1" /> Comments
                                  (5)
                                </a>
                              </span>
                            </p>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              placeholder="Type a comment"
                            />
                          </div>
                          {/* /.post */}
                          {/* Post */}
                          <div className="post clearfix">
                            <div className="user-block">
                              <img
                                className="img-circle img-bordered-sm"
                                src="../../dist/img/user7-128x128.jpg"
                                alt="User Image"
                              />
                              <span className="username">
                                <a href="#">Sarah Ross</a>
                                <a href="#" className="float-right btn-tool">
                                  <i className="fas fa-times" />
                                </a>
                              </span>
                              <span className="description">
                                Sent you a message - 3 days ago
                              </span>
                            </div>
                            {/* /.user-block */}
                            <p>
                              Lorem ipsum represents a long-held tradition for
                              designers, typographers and the like. Some people
                              hate it and argue for its demise, but others ignore
                              the hate as they create awesome tools to help create
                              filler text for everyone from bacon lovers to
                              Charlie Sheen fans.
                            </p>
                            <form className="form-horizontal">
                              <div className="input-group input-group-sm mb-0">
                                <input
                                  className="form-control form-control-sm"
                                  placeholder="Response"
                                />
                                <div className="input-group-append">
                                  <button
                                    type="submit"
                                    className="btn btn-danger"
                                  >
                                    Send
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                          {/* /.post */}
                          {/* Post */}
                          <div className="post">
                            <div className="user-block">
                              <img
                                className="img-circle img-bordered-sm"
                                src="../../dist/img/user6-128x128.jpg"
                                alt="User Image"
                              />
                              <span className="username">
                                <a href="#">Adam Jones</a>
                                <a href="#" className="float-right btn-tool">
                                  <i className="fas fa-times" />
                                </a>
                              </span>
                              <span className="description">
                                Posted 5 photos - 5 days ago
                              </span>
                            </div>
                            {/* /.user-block */}
                            <div className="row mb-3">
                              <div className="col-sm-6">
                                <img
                                  className="img-fluid"
                                  src="../../dist/img/photo1.png"
                                  alt="Photo"
                                />
                              </div>
                              {/* /.col */}
                              <div className="col-sm-6">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <img
                                      className="img-fluid mb-3"
                                      src="../../dist/img/photo2.png"
                                      alt="Photo"
                                    />
                                    <img
                                      className="img-fluid"
                                      src="../../dist/img/photo3.jpg"
                                      alt="Photo"
                                    />
                                  </div>
                                  {/* /.col */}
                                  <div className="col-sm-6">
                                    <img
                                      className="img-fluid mb-3"
                                      src="../../dist/img/photo4.jpg"
                                      alt="Photo"
                                    />
                                    <img
                                      className="img-fluid"
                                      src="../../dist/img/photo1.png"
                                      alt="Photo"
                                    />
                                  </div>
                                  {/* /.col */}
                                </div>
                                {/* /.row */}
                              </div>
                              {/* /.col */}
                            </div>
                            {/* /.row */}
                            <p>
                              <a href="#" className="link-black text-sm mr-2">
                                <i className="fas fa-share mr-1" /> Share
                              </a>
                              <a href="#" className="link-black text-sm">
                                <i className="far fa-thumbs-up mr-1" /> Like
                              </a>
                              <span className="float-right">
                                <a href="#" className="link-black text-sm">
                                  <i className="far fa-comments mr-1" /> Comments
                                  (5)
                                </a>
                              </span>
                            </p>
                            <input
                              className="form-control form-control-sm"
                              type="text"
                              placeholder="Type a comment"
                            />
                          </div>
                          {/* /.post */}
                        </div>
                        {/* /.tab-pane */}
                        <div className="tab-pane" id="timeline">
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
                            <p className="editheading" style={{ marginTop: "0" }}>Personal Information</p>
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
                                  style={{resize:"vertical"}}
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
                            <div className="form-group row">
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
                                  type="url"
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
                                  type="url"
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
  
                            <p className="editheading">
                              Professional Profiles
                            </p>
  
                            <div className="form-group row">
                              <label
                                htmlFor="inputGithub"
                                className="col-sm-2 col-form-label"
                              >
                                Github Link
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="url"
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
                                  type="url"
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
                                  type="url"
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