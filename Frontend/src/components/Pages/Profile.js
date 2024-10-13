/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext ,useState , useEffect, useRef , useCallback } from "react";
import axios from 'axios'
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import "./profile.css"
import  Cropper  from "react-image-crop"; // Import Cropper
import "react-image-crop/dist/ReactCrop.css"; // Import CSS for Cropper
import Modal from "react-bootstrap/Modal";

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
        showNotification(error.message || "Error fetching alumni data.", "error", "Error");
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
      showNotification(error.response.data.detail || "Error updating profile.", "error", "Error");
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
        alert("Image uploaded successfully");
        // You can refresh the user data here or perform any other updates.
      }
    } catch (error) {
      console.error("Error uploading the image: ", error);
      alert("Failed to upload the image");
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
        src={userData?.alumni_profile?.profile_picture_url || "../../dist/img/user4-128x128.jpg"}
        alt="User profile"
      />
      <button className="btn btn-primary mt-2" onClick={() => document.getElementById('imageInput').click()}>
        <i className="fas fa-edit"></i> Edit Profile Picture
      </button>

      {/* Modal for cropping */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imageSrc && (
            <div className="crop-container" style={{ width: '100%', maxHeight: '400px' }}>
              <Cropper
                src={imageSrc}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={onCropComplete}
                style={{ width: '100%', height: 'auto' }} // Responsive style
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCrop}>
            Crop & Save
          </button>
        </Modal.Footer>
      </Modal>

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

                {/* About Me Box */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">About Me</h3>
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
                      <li className="nav-item ">
                        <a
                          className="nav-link"
                          href="#settings"
                          data-toggle="tab"
                        >
                          Edit Profile
                        </a>
                      </li>
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
                            Online Profiles & Documents
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

const StudentProfileContent = () => {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);
  const id = localStorage.getItem("id")
    ? JSON.parse(localStorage.getItem("id"))
    : null;
  const [user, setUser] = useState(null);

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
    // Fetch alumni data when the component mounts
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
          }
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });
  }, [userData?.user_id]);

  console.log("user ", user);


    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null;
        // const filteredAlumniData = removeEmptyFields(alumniData);
        // console.log("filter data ",filteredAlumniData);
  
        // for (const key in alumniData) {
        //   if (alumniData.hasOwnProperty(key)) {
        //     console.log(`${key}:`, alumniData[key]);
        //   }
        // }
       
      try {
        const response = await axios.put(`http://127.0.0.1:8000/edit-student-profile/${id || userData?.user_id}/`, studentData,{
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        });
        console.log('Profile updated successfully', response.data);
        // After successful update, reset alumniData and refresh the window
  
        setStudentData({
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
        
         
      
      // Optionally, you can refresh the page or redirect to another page
           window.location.reload(); // This will refresh the page
      } catch (error) {
        console.error('Error updating profile:', error.message);
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

                {/* About Me Box */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">About Me</h3>
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
                      Graduation Year: {user?.graduation_year || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-building mr-1" /> Department
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.student_profile?.department || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-calendar-alt mr-1" /> Year Joined
                    </strong>

                    <p className="text-muted aboutfont">
                      {user?.Year_Joined || "N/A"}
                    </p>

                    <strong>
                      <i className="fas fa-calendar-alt mr-1" /> Current Year of
                      Study
                    </strong>
                    <p className="text-muted aboutfont">
                      {user?.student_profile?.current_year_of_study || "N/A"}
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
                          className="nav-link"
                          href="#contacts"
                          data-toggle="tab"
                        >
                          Contacts
                        </a>
                      </li>

                      <li className="nav-item">
                        <a className="nav-link" href="#edit" data-toggle="tab">
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      {/* /.tab-pane */}
                      <div className="tab-pane" id="contacts">
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
                              About:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="About"
                                className="form-control"
                                name="About"
                                value={studentData.user.About}
                                onChange={handleUserChange}
                                placeholder="About"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Work:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="Work"
                                className="form-control"
                                name="Work"
                                value={studentData.user.Work}
                                onChange={handleUserChange}
                                placeholder="Your Work"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Year Joined:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="Year_Joined"
                                className="form-control"
                                name="Year_Joined"
                                value={studentData.user.Year_Joined}
                                onChange={handleUserChange}
                                placeholder="Year Joined"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Graduation Year:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="graduation_year"
                                className="form-control"
                                name="graduation_year"
                                value={studentData.user.graduation_year}
                                onChange={handleUserChange}
                                placeholder="Graduation Year"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Branch:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="Branch"
                                className="form-control"
                                name="Branch"
                                value={studentData.user.Branch}
                                onChange={handleUserChange}
                                placeholder="Branch"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Email:
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
                              Mobile:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="mobile"
                                className="form-control"
                                name="mobile"
                                value={studentData.user.mobile}
                                onChange={handleUserChange}
                                placeholder="Mobile No"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              LinkedIn:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="url"
                                id="linkedin"
                                className="form-control"
                                name="linkedin"
                                value={studentData.user.linkedin}
                                onChange={handleUserChange}
                                placeholder="Linkedin URL"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Github:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="url"
                                id="Github"
                                className="form-control"
                                name="Github"
                                value={studentData.user.Github}
                                onChange={handleUserChange}
                                placeholder="Github URL"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Instagram:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="url"
                                id="instagram"
                                className="form-control"
                                name="instagram"
                                value={studentData.user.instagram}
                                onChange={handleUserChange}
                                placeholder="Instagram URL"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Portfolio Link:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="url"
                                id="portfolio_link"
                                className="form-control"
                                name="portfolio_link"
                                value={studentData.user.portfolio_link}
                                onChange={handleUserChange}
                                placeholder="Portfolio URL"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Resume Link:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="url"
                                id="resume_link"
                                className="form-control"
                                name="resume_link"
                                value={studentData.user.resume_link}
                                onChange={handleUserChange}
                                placeholder="Resume URL"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Skills:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="skills"
                                name="skills"
                                value={studentData.user.skills}
                                onChange={handleUserChange}
                                placeholder="Skills"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Heading:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="Heading"
                                className="form-control"
                                name="Heading"
                                value={studentData.profile.Heading}
                                onChange={handleProfileChange}
                                placeholder="Your Heading"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Education:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="Education"
                                className="form-control"
                                name="Education"
                                value={studentData.profile.Education}
                                onChange={handleProfileChange}
                                placeholder="Education"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Current Year of Study:
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                id="current_year_of_study"
                                className="form-control"
                                name="current_year_of_study"
                                value={
                                  studentData.profile.current_year_of_study
                                }
                                onChange={handleProfileChange}
                                placeholder="Current Year of Study"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
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

const SuperUserProfileContent = () => {
  let { userData } = useContext(AuthContext);
  console.log("userData", userData);
  const id = localStorage.getItem("id")
    ? JSON.parse(localStorage.getItem("id"))
    : null;


    Modal.setAppElement('#root');

  const [user, setUser] = useState(null);

  const [superUserData, setSuperUserData] = useState({
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
      skills: '',
    },
    profile: {
      user: {
        // username: user?.username,
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
      skills: '',
      },
      designation:'', // Designation for the HOD
    },
  });
  

  const [posts, setPosts] = useState([]);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [modalContent, setModalContent] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Function to open the modal with content (image or document)
  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent(null);
  };


  
  useEffect(() => {
    // Fetch alumni data when the component mounts
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;

    axios
      .get(`http://127.0.0.1:8000/hods/${id || userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        setUser(response.data);
          if(response.data){
            setSuperUserData({
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
                designation: response.data.hod_profile.designation
          }
            })
          }
      })
      .catch((error) => {
        console.error("Error fetching alumni data:", error);
      });

     
  }, [userData?.user_id]);

  useEffect(() => {
    const token = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
    axios
      .get(`http://127.0.0.1:8000/hodposts/author/${userData?.user_id}`, {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        // console.log("ress "+JSON.stringify(response.data))
      })
      .catch((error) => {
        console.error('Error fetching the posts:', error);
      });
  }, [userData?.user_id]);

  console.log("user ", user);
  // console.log("postsss "+ posts);

 

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null;
      // const filteredAlumniData = removeEmptyFields(alumniData);
      // console.log("filter data ",filteredAlumniData);

      // for (const key in alumniData) {
      //   if (alumniData.hasOwnProperty(key)) {
      //     console.log(`${key}:`, alumniData[key]);
      //   }
      // }
     
    try {
      const response = await axios.put(`http://127.0.0.1:8000/edit-hod-profile/${id || userData?.user_id}/`, superUserData,{
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      });
      console.log('Profile updated successfully', response.data);
      // After successful update, reset alumniData and refresh the window

      setSuperUserData({
        user: {
          // username: "",
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
            // username: "",
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
          designation:""
        },
      });
      
       
    
    // Optionally, you can refresh the page or redirect to another page
         window.location.reload(); // This will refresh the page
    } catch (error) {
      console.error('Error updating profile:', error.message);
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
                          : "Admin"
                        : "User"}
                    </div>
                  </div>

                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={
                          user?.hod_profile?.profile_picture_url ||
                          "../../dist/img/user4-128x128.jpg"
                        }
                        alt="User profile picture"
                      />
                    </div>
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

                {/* About Me Box */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">About Me</h3>
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
                      <i className="fas fa-laptop-code mr-1" /> Year Joined
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
                          className="nav-link active"
                          href="#activity"
                          data-toggle="tab"
                        >
                          Posts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#timeline"
                          data-toggle="tab"
                        >
                          Contacts
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#settings"
                          data-toggle="tab"
                        >
                          Edit Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="active tab-pane" id="activity">
                        {/* Post */}
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
                                      {user?.instagram ? user.instagram : "N/A"}
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
                            <label
                              htmlFor="inputMobile"
                              className="col-sm-2 col-form-label"
                            >
                              Mobile
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="mobile"
                                name="mobile"
                                value={superUserData?.user?.mobile}
                                onChange={handleUserChange}
                                placeholder="Mobile"
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
                                placeholder="LinkedIn URL"
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
                                placeholder="Instagram URL"
                              />
                            </div>
                          </div>

                          {/* <div className="form-group row">
                              <label htmlFor="inputLinkedIn" className="col-sm-2 col-form-label">
                                Portfolio
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="portfolio_link"
                                  name="portfolio_link"
                                  value={superUserData?.user?.portfolio_link}
                                  onChange={handleUserChange}
                                  placeholder="Portfolio URL"
                                />
                              </div>
                            </div> */}

                          <div className="form-group row">
                            <label
                              htmlFor="inputLinkedIn"
                              className="col-sm-2 col-form-label"
                            >
                              Year Joined
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="Year_Joined"
                                name="Year_Joined"
                                value={superUserData?.user?.Year_Joined}
                                onChange={handleUserChange}
                                placeholder="Year Joined"
                              />
                            </div>
                          </div>

                          {/* <div className="form-group row">
                              <label htmlFor="inputLinkedIn" className="col-sm-2 col-form-label">
                                Resume
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="resume_link"
                                  name="resume_link"
                                  value={superUserData?.user?.resume_link}
                                  onChange={handleUserChange}
                                  placeholder="Resume URL"
                                />
                              </div>
                            </div> */}

                          <div className="form-group row">
                            <label
                              htmlFor="inputLinkedIn"
                              className="col-sm-2 col-form-label"
                            >
                              About
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="About"
                                name="About"
                                value={superUserData?.user?.About}
                                onChange={handleUserChange}
                                placeholder="About"
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
                                type="text"
                                className="form-control"
                                id="graduation_year"
                                name="graduation_year"
                                value={superUserData?.user?.graduation_year}
                                onChange={handleUserChange}
                                placeholder="Graduation Year  "
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
                                value={superUserData?.user?.Branch}
                                onChange={handleUserChange}
                                placeholder="Your Branch"
                              />
                            </div>
                          </div>

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
                                placeholder="Github URL"
                              />
                            </div>
                          </div>

                          {/* <div className="form-group row">
                              <label htmlFor="inputSkills" className="col-sm-2 col-form-label">
                                Skills
                              </label>
                              <div className="col-sm-10">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="skills"
                                  name="skills"
                                  value={superUserData?.user?.skills}
                                  onChange={handleUserChange}
                                  placeholder="Skills"
                                />
                              </div>
                            </div> */}

                          {/* Profile Specific Fields */}
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
                                placeholder="Designation"
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
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

const Profile = () => {
  const location = useLocation();
  const { state } = location;
  let {
    userData,
    setFilter,
    isOpen,
    message,
    icon,
    title,
    handleClose,
    loading,
  } = useContext(AuthContext);
  
  setFilter(false);
  console.log("state", state);
  
  if (state) {
    userData = state;
    localStorage.setItem("id", JSON.stringify(state?.id));
  }
  console.log(" userData", userData);
  const getProfileContent = () => {
    if (userData.is_student) {
      return StudentProfileContent;
    } else if (userData.is_alumni) {
      return AlumniProfileContent;
    } else if (userData.is_superuser || (!userData.is_student && !userData.is_alumni)) {
      return SuperUserProfileContent;
    }
  };
  return (
    <>
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <Home
        DynamicContent={getProfileContent()}
        url="profile"
        heading="Profile"
      />
    </>
  );
};

export default Profile;
