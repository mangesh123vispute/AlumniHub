/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Notification from "../Notification/Notification.js";
import baseurl from "../const.js";
import { Link } from "react-router-dom";

const Login = () => {
  
  const {
    setMessage,
    isOpen,
    message,
    icon,
    title,
    showNotification,
    handleClose,
    setAuthTokens,
    setUser,
    setLogin,
    setFilter,
    toggleLogin,
  } = useContext(AuthContext);

 setFilter(false);

   const navigate = useNavigate();
   const [Loading, setLoading] = useState(false);
   const [formData, setFormData] = useState({
     username: "",
     password: "",
   });
  
   const handleChange = (e) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  if (!(formData.username && formData.password)) {
    if (!formData.username) {
      await showNotification("Username is required", "warning", "Warning");
    } else if (!formData.password) {
      await showNotification("Password is required", "warning", "Warning");
    }
    setLoading(false);
    return;
  }

  try {
   

    const response = await fetch(`${baseurl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false);
      if (response.status === 200) {
        setAuthTokens(data.token);
        setUser(jwtDecode(data.access));
        // localStorage.setItem("authTokens", JSON.stringify(data));
        localStorage.setItem(
          "authTokens",
          JSON.stringify({
            access: data.access, // response is the API login response
            refresh: data.refresh,
          })
        );
        await showNotification("Login successful", "success", "Success");
        toggleLogin();
        navigate("/myprofile");
      }
    } else {
      
     await showNotification(
        data.detail || "Something went wrong.",
        "warning",
        "Warning"
      );

      setLoading(false);
    }
  } catch (error) {
    console.error("Error during login:", error);
    setMessage("An error occurred during login. Please try again.", error);
   await showNotification(
     "Something went wrong, please try again.",
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
      <div className="hold-transition login-page">
        <div className="login-box">
          <div
            className="login-logo"
            style={{ fontSize: "30px", fontWeight: 100 }}
          >
            <Link to="/" style={{ color: "#007bff" }}>
              AlumniHub |
              <span
                style={{
                  fontSize: "21px",
                  marginLeft: "3px",
                  color: "#007bff",
                }}
              >
                SSBT COET
              </span>
            </Link>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                <b>Login</b> to start your session
              </p>
              <hr
                style={{
                  border: "1px solid #d2d6df",
                  marginBottom: "20px",
                  marginTop: "0px",
                }}
              />
              <form onSubmit={handleSubmit}>
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
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">
                      Login
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>

              <hr
                style={{
                  border: "1px solid #d2d6df",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              {/* /.social-auth-links */}
              <div className="row text-center text-md-left">
                <div className="col-12 col-md-3 mb-2">
                  <Link to="/" style={{ color: "#007bff", fontSize: "0.8em" }}>
                    <i className="fas fa-home"></i> Home
                  </Link>
                </div>

                <div className="col-12 col-md-5 mb-2 mr-3">
                  <div className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      style={{ color: "#007bff", fontSize: "0.8em" }}
                    >
                      <i className="fas fa-user-lock mr-1"></i> Forgot
                      Credentials
                    </a>
                    <div
                      className="dropdown-menu p-1"
                      style={{ fontSize: "0.9em", minWidth: "150px" }}
                    >
                      <Link to="/forgot_password" className="dropdown-item">
                        <i className="fas fa-unlock-alt mr-1"></i> Forgot
                        Password
                      </Link>
                      <Link to="/forgot_username" className="dropdown-item">
                        <i className="fas fa-user mr-1"></i> Forgot Username
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-3 mb-2">
                  <Link
                    to="/register"
                    style={{ color: "#007bff", fontSize: "0.8em" }}
                  >
                    <i className="fas fa-user-plus"></i> Register
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

export default Login;
