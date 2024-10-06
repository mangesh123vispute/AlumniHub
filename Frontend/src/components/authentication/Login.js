/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Notification from "../Notification/Notification.js";

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
  
  } = useContext(AuthContext);



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
    await showNotification("All fields are required", "warning", "Warning");
    return;
  }

  try {
    console.log(formData);

    const response = await fetch("http://127.0.0.1:8000/login/", {
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
        setLogin(true);
        navigate("/home2");
      }
    } else {
      console.log("Login failed:", data);
      // setMessage(data.detail || "Something went wrong.");
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
      error || "Something went wrong.",
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AlumniHub| Log in</title>
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
        <div className="login-box">
          <div className="login-logo">
            <a href="/home">
              <b>ALumni</b>Hub
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
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
                  <div className="col-8">
                    {/* <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label htmlFor="remember">Remember Me</label>
                    </div> */}
                  </div>
                  {/* /.col */}
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              {/* <div className="social-auth-links text-center mb-3">
                <p>- OR -</p>
                <a href="#" className="btn btn-block btn-primary">
                  <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                </a>
                <a href="#" className="btn btn-block btn-danger">
                  <i className="fab fa-google-plus mr-2" /> Sign in using
                  Google+
                </a>
              </div> */}
              {/* /.social-auth-links */}
              <p className="mb-1">
                <a href="/forgot_password">I forgot my password</a>
              </p>
              <p className="mb-0">
                <a href="/register" className="text-center">
                  Register a new membership
                </a>
              </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
        {/* /.login-box */}
        {/* jQuery */}
        {/* Bootstrap 4 */}
        {/* AdminLTE App */}
      </div>
    </>
  );
};

export default Login;
