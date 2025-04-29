import React, { useState, useContext,useEffect } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import baseurl from "../const.js";
const ActivateEmail = () => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [role, setRole] = useState("");
  const [graduation_month, setGraduation_month] = useState("");
  const [graduation_year, setGraduation_year] = useState("");
  const navigate = useNavigate();
  const { useremail } = useParams();
  const decodedUserEmail = atob(useremail);


  async function fetchUserDetails(email) {
    try {
      const response = await fetch(`${baseurl}/user-detail/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  useEffect(() => {
    fetchUserDetails(decodedUserEmail).then((data) => {
      if (data) {
        
        setUsername(data.username);
        setEmail(data.email);
        setRole(data.role);
        setGraduation_month(data.graduation_month);
        setGraduation_year(data.graduation_year);
      }
    });
  }, []);



  const {
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

  useEffect(() => {
    setIsForgotPassPageOrActivateAccountPage(true);
    setFilter(false);
  }, []);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword || !role || !graduation_year || !graduation_month) {
      setLoading(false);
      if (!username) {
        await showNotification(
          "Username is required!!",
          "warning",
          "Warning"
        );
        
      }
      else if (!email) {
        await showNotification(
          "Email is required!!",
          "warning",
          "Warning"
        );
      }
      else if (!password) {
        await showNotification(
          "Password is required!!",
          "warning",
          "Warning"
        );
      }
      else if (!confirmPassword) {
        await showNotification(
          "confirmPassword is required!!",
          "warning",
          "Warning"
        );
      }
      else if (!role) {
        await showNotification(
          "User role is required!!",
          "warning",
          "Warning"
        );
      }
      else if (!graduation_year) {
        await showNotification(
          "Graduation year is required!!",
          "warning",
          "Warning"
        );
      }
      else if (!graduation_month) {
        await showNotification(
          "Graduation month is required!!",
          "warning",
          "Warning"
        );
      }
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setLoading(false);
      await showNotification("Passwords do not match!!", "warning", "Warning");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/activate-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role, graduation_year, graduation_month }), 
      });

      if (response.ok) {
        setLoading(false);
        await showNotification(
          "Activation email sent successfully! Please check your inbox.",
          "success",
          "Success"
        );
        navigate("/login");
      } else {
        setLoading(false);
        const errorData = await response.json();
        await showNotification(
          `Error: ${errorData.detail || "Failed to send activation email."}`,
          "error",
          "Error"
        );
      }
    } catch (error) {
      setLoading(false);
      await showNotification(
        "Failed to send activation email. Please try again later.",
        "error",
        "Error"
      );
      console.error("Error:", error);
    }
  };



  return (
    <div>
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
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <Link to="/" style={{ color: "#007bff", fontSize: "25px" }}>
                AlumniHub |{" "}
                <span style={{ marginLeft: "3px", fontSize: "21px" }}>
                  SSBT COET
                </span>
              </Link>
            </div>
            <div className="card-body">
              <p className="login-box-msg" style={{ fontSize: "1em" }}>
                Please fill in the remaining information below to <br></br>
                <b>Activate your account!!</b>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                    required // Make it required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" /> {/* Username Icon */}
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update email state
                    required // Make it required
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
                        value={graduation_month}
                        onChange={(e) => setGraduation_month(e.target.value)}
                        min="1"
                        max="12"
                        required
                        readOnly={role === "Student"}
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
                        value={graduation_year}
                        onChange={(e) => setGraduation_year(e.target.value)}
                        min="1983"
                        max="2100"
                        required
                        readOnly={role === "Student"}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    required // Make it required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" /> {/* Password Icon */}
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
                    required // Make it required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />{" "}
                      {/* Confirm Password Icon */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      style={{ fontSize: "0.9em" }}
                    >
                      Send Confirmation Email
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
    </div>
  );
};

export default ActivateEmail;
