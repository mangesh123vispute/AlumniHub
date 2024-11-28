/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification.js"
import baseurl from "../const.js";
import { Link } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  let {
    isOpen,
    message,
    icon,
    title,
    showNotification,
    handleClose,
    setFilter
  } = useContext(AuthContext);
 setFilter(false);
  const [Loading, setLoading] = useState(false);
  // const [selectedDocument, setSelectedDocument] = useState("");

  // const handleDocumentSelect = (e) => {
  //   setSelectedDocument(e.target.value);
  //   setFormData({ ...formData, document_type: e.target.value });
  // };
  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, document_file: e.target.files[0] });
  // };
  const [formData, setFormData] = useState({
     full_name: "",
     username: "",
     email: "",
     password: "",
     confirmPassword: "",
     graduation_year: "",
     graduation_month: "",
     linkedin: "",
    //  document_type: "",
    //  document_file: null,
   });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const validateForm = () => {
    const {
      full_name,
      username,
      email,
      password,
      confirmPassword,
      graduation_year,
      graduation_month,
      linkedin,
      // document_type,
      // document_file,
    } = formData;

    if (
      !full_name ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !graduation_year ||
      !graduation_month ||
      !linkedin
      // !document_type ||
      // !document_file
    ) {
      showNotification("All fields are required!", "warning", "Warning");
      return false;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "warning", "Warning");
      return false;
    }

    if (password.length < 8) {
      showNotification(
        "Password must be at least 8 characters long!",
        "warning",
        "Warning"
      );
      return false;
    }
   const linkedinPattern =
     /^https:\/\/(www\.)?linkedin\.com\/[a-zA-Z0-9\/._-]+\/?$/;
   if (!linkedinPattern.test(linkedin)) {
     showNotification(
       "Please enter a valid LinkedIn Profile",
       "warning",
       "Warning"
     );
     return false;
   }

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const gradYear = parseInt(graduation_year);
    const gradMonth = parseInt(graduation_month);
    if (
      gradYear > currentYear ||
      (gradYear === currentYear && gradMonth >= currentMonth)
    ) {
      showNotification(
        "Graduation date must be in the past for alumni!",
        "warning",
        "Warning"
      );
      return false;
    }

    return true;
  };


 const handleSubmit = async (e) => {
   e.preventDefault();
   setLoading(true);

   if (!validateForm()) {
     setLoading(false);
     return;
   }

   const formDataToSend = new FormData();
   Object.entries(formData).forEach(([key, value]) => {
     if (value) {
       formDataToSend.append(key, value);
     }
   });

   try {
     const response = await fetch(`${baseurl}/register-alumni/`, {
       method: "POST",
       body: formDataToSend,
     });

     const data = await response.json();
     setLoading(false);

     if (response.ok && response.status === 201) {
       await showNotification(
         data?.detail || "Registration successful!",
         "success",
         "Success"
       );
     } else {
       let errorMessage = "";
       for (const key in data) {
         if (Array.isArray(data[key]) && data[key].length > 0) {
           errorMessage += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
             data[key][0]
           }\n`;
         } else if (typeof data[key] === "string") {
           errorMessage += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${
             data[key]
           }\n`;
         }
       }

       if (!errorMessage) {
         errorMessage = "Something went wrong.";
       }

       await showNotification(errorMessage.trim(), "error", "Error");
     }

   } catch (error) {
     console.error("Error:", error);
     
       showNotification(
         error?.response?.data?.detail || "Something went wrong",
         "error",
         "Error"
       );
    
     setLoading(false);
   }
 };


  return (
    <>
      <LoadingSpinner isLoading={Loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <div className="hold-transition register-page">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AlumniHub | Registration Page</title>
        {/* Google Font: Source Sans Pro */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"
        />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="../../plugins/fontawesome-free/css/all.min.css"
        />
        {/* icheck bootstrap */}
        <link
          rel="stylesheet"
          href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css"
        />
        {/* Theme style */}
        <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />
        <div className="register-box">
          <div className="register-logo">
            <Link to="/" style={{ color: "#007bff" }}>
              <b>
                AlumniHub |
                <span
                  style={{
                    fontSize: "25px",
                    marginLeft: "5px",
                  }}
                >
                  SSBT COET
                </span>
              </b>
            </Link>
          </div>
          <div className="card">
            <div className="card-body register-card-body">
              <p className="login-box-msg" style={{ marginBottom: "0px" }}>
                {" "}
                Register as a <b>Alumni</b>
              </p>

              <hr
                style={{
                  border: "1px solid #d2d6df",
                  marginBottom: "20px",
                  marginTop: "0px",
                }}
              />
              <div
                style={{
                  height: "50vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
                  {/* Basic Information Section */}
                  <h5
                    style={{
                      color: "#007bff",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Basic Information
                  </h5>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>

                  <div className="form-row mb-3">
                    <div className="col-6">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Grad Mth."
                          name="graduation_month"
                          value={formData.graduation_month}
                          onChange={handleChange}
                          min="1"
                          max="12"
                          required
                        />
                        <div className="input-group-append">
                          <div
                            className="input-group-text"
                            style={{ padding: "0px 5px" }}
                          >
                            <span className="fas fa-calendar-alt" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Grad Yr."
                          name="graduation_year"
                          value={formData.graduation_year}
                          onChange={handleChange}
                          min="1983"
                          max="2100"
                          required
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-calendar" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Credentials & Security Section */}
                  <hr
                    style={{
                      border: "1px solid #d2d6df",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  />
                  <h5
                    style={{
                      color: "#007bff",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Credentials
                  </h5>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="LinkedIn profile link"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fab fa-linkedin" />
                      </div>
                    </div>
                  </div>

                  {/* <div className="form-group">
                    <select
                      onChange={handleDocumentSelect}
                      className="form-control select2"
                      style={{ width: "100%" }}
                    >
                      <option value="">Select a Document</option>
                      <option value="lc">Leaving Certificate (LC)</option>
                      <option value="id_card">ID Card</option>
                      <option value="fourth_year_marksheet">
                        Fourth Year Marksheet
                      </option>
                      <option value="graduation_certificate">
                        Graduation Certificate
                      </option>
                    </select>
                  </div> */}

                  {/* {selectedDocument && (
                    <div className="form-group">
                      <span>
                        Select Document: <b>{selectedDocument}</b>
                      </span>
                      <input
                        type="file"
                        className="form-control"
                        name="document_file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  )} */}
                  <hr
                    style={{
                      border: "1px solid #d2d6df",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  />
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>

                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </form>

                <hr
                  style={{
                    border: "1px solid #d2d6df",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
                <span>
                  <i style={{ fontSize: "15px", color: "red" }}>Note:</i>
                </span>
                <br></br>
                <i style={{ fontSize: "12px", color: "red" }}>
                  1. Submit at least one document for verification.
                </i>
                <br></br>
                <i style={{ fontSize: "12px", color: "red" }}>
                  2. After registration, admin will verify your documents.
                  You'll be notified by email and granted access to log in.
                </i>

                <br />
                <i style={{ fontSize: "12px", color: "red" }}>
                  3.SSBT COET students: Contact your class teacher or HOD to
                  register; they will complete the registration for you.
                </i>
              </div>
              <hr
                style={{
                  border: "1px solid #d2d6df",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />

              <div className="row">
                <div className="col-4">
                  <Link to="/" style={{ color: "#007bff" }}>
                    <i className="fas fa-home"></i> Home
                  </Link>
                </div>
                <div className="col-4">
                  <Link
                    to="/send_activation_Email"
                    style={{ color: "#007bff" }}
                  >
                    <i className="fas fa-check-circle"></i> Activate
                  </Link>
                </div>

                <div className="col-3">
                  <Link to="/login" style={{ color: "#007bff" }}>
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;