// ForgotPassword.js
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification.js";
import LoadingSpinner from "../Loading/Loading.js";
const ForgotUsername = () => {
  const [email, setEmail] = useState("");
  let {
    isOpen,
    message,
    icon,
    title,
    showNotification,
    handleClose,
    setFilter,
    setIsForgotPassPageOrActivateAccountPage,
  } = useContext(AuthContext);

  const [Loading, setLoading] = useState(false);
  useEffect(function () {
    setIsForgotPassPageOrActivateAccountPage(true);
    setFilter(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/forgot-username/",
        { email }
      );
      if (response.status === 200) {
        setLoading(false);
        showNotification(response.data.detail, "success", "Success");
      } else {
        setLoading(false);
        showNotification(response.data.detail, "error", "Error");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      showNotification(
        error.response.data.detail ||
          "Failed to reset username, Please try again",
        "error",
        "Error"
      );
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
          <div className="login-logo">
            <Link to="/" style={{ color: "#007bff" }}>
              AlumniHub |{" "}
              <span style={{ fontSize: "25px", marginLeft: "5px" }}>
                SSBT COET
              </span>
            </Link>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                Forgot your username ? Easily reset it here.
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
                    type="email"
                    value={email}
                    class="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">
                      Request new username
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
              <div className="row">
                <div className="col-4">
                  <Link to="/" style={{ color: "#007bff" }}>
                    <i className="fas fa-home"></i> Home
                  </Link>
                </div>
                <div className="col-4">
                  <Link to="/register" style={{ color: "#007bff" }}>
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </div>

                <div className="col-4">
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

export default ForgotUsername;
