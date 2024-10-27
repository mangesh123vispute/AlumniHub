/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification.js"
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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    graduation_year: "",
    graduation_month: "",
  });
  // const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleRadioChange = (e) => {
   setFormData({ ...formData, role: e.target.value });
 };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  if (
    !(formData.username &&
    formData.password &&
    formData.confirmPassword &&
    formData.email && formData.role  && formData.graduation_year && formData.graduation_month)
  ) {
    if (!formData.username) {
      await showNotification("Username is required!!", "warning", "Warning");
    } else if (!formData.password) {
      await showNotification("Password is required!!", "warning", "Warning");
    }
    else if (!formData.confirmPassword) {
      await showNotification("Confirm Password is required!!", "warning", "Warning");
    }
    else if (!formData.email) {
      await showNotification("Email is required !!", "warning", "Warning");
    }
    else if (!formData.role) {
      await showNotification("Role is required !!", "warning", "Warning");
    }
    else if(!formData.graduation_year) {
      await showNotification("Graduation year is required !!", "warning", "Warning");
    }
    else if (!formData.graduation_month) {
      await showNotification("Graduation month is required !!", "warning", "Warning");
    }
    setLoading(false);
    return;
  }
    if (formData.password !== formData.confirmPassword) {
      // setMessage("Passwords do not match!");
      setLoading(false);
      await showNotification("Passwords do not match!", "warning", "Warning");
      return;
    }
  if (formData.password.length < 8) {
    
    setLoading(false);
    await showNotification("Password must be at least 8 characters long!", "warning", "Warning");
    return;
     
  }
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if(formData.role === "Student") {
   const gradYear = parseInt(formData.graduation_year);
   const gradMonth = parseInt(formData.graduation_month);

   if (
     gradYear < currentYear ||
     (gradYear === currentYear && gradMonth <= currentMonth)
   ) {
     setLoading(false);
     await showNotification(
       "Graduation date must be in the future for students!",
       "warning",
       "Warning"
     );
     return;
    }
  }
  else if (formData.role === "Alumni") {
  const gradYear = parseInt(formData.graduation_year);
  const gradMonth = parseInt(formData.graduation_month);

  if (gradYear > currentYear || (gradYear === currentYear && gradMonth >= currentMonth)) {
    setLoading(false);
    await showNotification("Graduation date must be in the past for alumni!", "warning", "Warning");
    return;
  }
}
  try {
    const response = await fetch("http://127.0.0.1:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        graduation_year: formData.graduation_year,
        graduation_month: formData.graduation_month
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false);
      if (response.status === 201) {
        // console.log("Registration successful:", data);
        await showNotification('Registration successful !', 'success', 'Success')
        navigate("/login"); 
      }
    } else {
      // Handle message response
      // console.log("Registration failed:", data);
       if (data.email) {
        //  setMessage(`Email: ${data.email[0]}`); 
        await showNotification(`Email: ${data.email[0]}`, 'error', 'Error')

       } else if (data.username) {
        //  setMessage(`Username: ${data.username[0]}`);
         await showNotification(`Username: ${data.username[0]}`, 'error', 'Error')
       } else {
        //  setMessage(data.detail || "Something went wrong.");
        await showNotification(`${data.detail} || "Something went wrong."`, 'error', 'Error')

       }
       setLoading(false)
    }

  }catch (error) {
    // console.error("Error during registration:", error);
    // setMessage("An error occurred during registration. Please try again.");
    await showNotification(`Error during registration, Please try again.`, 'error', 'Error')

    setLoading(false);
  } };

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
            <a href="../../index2.html">
              <b>Alumni</b>Hub
            </a>
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

              <form
                onSubmit={handleSubmit}
                style={{
                  height: "40vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
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
                  {/* Graduation Month */}
                  <div className="col-6">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Grad Month "
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
                          style={{
                            padding: "0px",
                            paddingRight: "5px",
                            paddingLeft: "5px",
                          }}
                        >
                          <span className="fas fa-calendar-alt" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Graduation Year */}
                  <div className="col-6">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Grad Year"
                        name="graduation_year"
                        value={formData.graduation_year}
                        onChange={handleChange}
                        min="1983"
                        max="2100"
                        required
                      />
                      <div className="input-group-append">
                        <div
                          className="input-group-text"
                          style={{
                            padding: "0px",
                            paddingRight: "5px",
                            paddingLeft: "5px",
                          }}
                        >
                          <span className="fas fa-calendar" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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

                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </div>
                </div>
              </form>
              <hr
                style={{
                  border: "1px solid #d2d6df",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <i style={{ fontSize: "12px", color: "red" }}>
                If you're a student of SSBT COET and would like to register,
                please contact your class teacher or HOD to register yourself.
              </i>
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