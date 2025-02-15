// ResetPassword.js
import React, { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification.js";
import LoadingSpinner from "../Loading/Loading.js";
import baseurl from "../const.js";
const ResetUsername = () => {
  const { uidb64, token } = useParams();
  const [newUsername, setnewUsername] = useState("");

  let {
    isOpen,
    message,
    icon,
    title,
    showNotification,
    handleClose,
    setFilter,
  } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  setFilter(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!newUsername) {
      setLoading(false);
      showNotification("Please enter a new Username", "warning", "Warning");
      return;
    }

    try {
      const response = await axios.post(
        `${baseurl}/reset-username/${uidb64}/${token}/`,
        { new_username: newUsername }
      );
      if (response.status === 200) {
        setLoading(false);
        showNotification(response.data.detail, "success", "Success");
      }
    } catch (error) {
      setLoading(false);

      // Default error message
      let errorMessage = "Failed to reset username. Please try again.";

      // Check if error contains a 'detail' field
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }

      // Show notification with the determined error message
      showNotification(errorMessage, "warning", "Warning");
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
              AlumniHub | <span style={{ color: "#007bff",fontSize:"22px" }}>SSBT COET</span>
            </Link>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                Recover your username in one step!
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
                    value={newUsername}
                    className="form-control"
                    onChange={(e) => setnewUsername(e.target.value)}
                    placeholder="Enter new username"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
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

export default ResetUsername;
