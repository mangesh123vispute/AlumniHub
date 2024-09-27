/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification.js"
const Register = () => {
  const navigate = useNavigate();
  let { setIsOpen, setMessage, setIcon, setTitle, isOpen, message, icon, title, showNotification,handleClose } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      // setMessage("Passwords do not match!");
      setLoading(false)
     await showNotification('Passwords do not match!', 'warning', 'Warning')
      return;
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
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoading(false);
      if (response.status === 201) {
        // console.log("Registration successful:", data);
        await showNotification('Registration successful:', 'success', 'Success')
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
    await showNotification(`Error during registration: ${error}`, 'error', 'Error')

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
              <p className="login-box-msg">Register a new membership</p>

              {/* {message && <p style={{ color: "red" }}>{message}</p>} */}

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
                  <div className="col-8">
                    <div
                      class="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      {/* <label class="btn bg-olive active">
                    <input type="radio" name="options" id="option_b1" autocomplete="off" checked/> Active
                  </label> */}
                      <label class="btn bg-olive">
                        <input
                          type="radio"
                          name="options"
                          id="option_b2"
                          autocomplete="off"
                        />{" "}
                        Student
                      </label>
                      <label class="btn bg-olive">
                        <input
                          type="radio"
                          name="options"
                          id="option_b3"
                          autocomplete="off"
                        />{" "}
                        Alumni
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </div>
                </div>
              </form>

              <hr style={{ marginTop: "1em" }} />
              <div style={{ marginTop: "1em", fontSize: "0.9em" }}>
                <p >
                  <a href="/login" className="text-center mt-3">
                    I already have a membership
                  </a>
                  <br />
                  <a href="/login" className="text-center mt-3">
                    Register as New College
                  </a>
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;