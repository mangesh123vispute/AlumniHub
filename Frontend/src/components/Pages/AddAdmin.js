import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Home from "../Dashboard/Home.js";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate } from "react-router-dom";
import baseurl from "../const.js";


const AddAdmin = () => {
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const {
       showNotification,
       toggleModal,
       toggleAddAdminModal,
       isAddAdminModalOpen,
       toggelreloadAdminData,
       message,
       isOpen,
       handleClose,
       icon,
       title,
     } = useContext(AuthContext);
    
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [branch, setBranch] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [allowSettings, setAllowSettings] = useState(false);
    const [allowAddAdmin, setAllowAddAdmin] = useState(false);
    const [allowAccessAlumniPost, setallowAccessAlumniPost] =
      useState(false);
    const [allowAccessAlumniJoinRequest, setAllowAccessAlumniJoinRequest] =
        useState(false);
    
     const handleAddAdmin = async (e) => {
       e.preventDefault();
       setLoading(true);

       const newStaff = {
         full_name: fullName,
         email,
         designation,
         Branch: branch,
         username,
         password,
         is_allowedToAccessSettings: allowSettings,
         is_allowedToJoinAlumni: allowAccessAlumniJoinRequest,
         is_allowedToAddAdmin: allowAddAdmin,
         is_allowedToAccessPostRequestTab: allowAccessAlumniPost,
       };
       const token = localStorage.getItem("authTokens")
         ? JSON.parse(localStorage.getItem("authTokens"))
         : null;
       if (
         fullName === "" ||
         email === "" ||
         designation === "" ||
         branch === "" ||
         username === "" ||
         password === "" ||
         confirmPassword === ""
       ) {
         showNotification("All fields are required", "error", "Error");
         setLoading(false);
         return;
       }
       if (password !== confirmPassword) {
         showNotification("Passwords do not match", "error", "Error");
         setLoading(false);
         return;
       }
       try {
         const response = await axios.post(
           `${baseurl}/register-admin/`,
           newStaff,
           { headers: { Authorization: `Bearer ${token?.access}` } }
         );
         if (response.status === 201) {
           showNotification("Admin added successfully", "success", "Success");
           setFullName("");
           setEmail("");
           setDesignation("");
           setUsername("");
           setBranch("");
           setPassword("");
           setConfirmPassword("");
           toggleModal();
           setAllowSettings(false);
           setAllowAddAdmin(false);
           setallowAccessAlumniPost(false);
           setAllowAccessAlumniJoinRequest(false);
           toggelreloadAdminData();
           toggleAddAdminModal();
         }
       } catch (error) {
         // Check for specific error messages
         if (error.response && error.response.data) {
           const errorData = error.response.data;
           let errorMessage = "";

           // If there's a detail message, use it directly
           if (errorData.detail) {
             errorMessage = errorData.detail;
           } else {
             // Otherwise, collect specific field errors
             for (const key in errorData) {
               if (Array.isArray(errorData[key])) {
                 errorMessage += `${errorData[key][0]}\n`;
               }
             }
           }

           showNotification(
             errorMessage.trim() || "Failed to add Admin",
             "error",
             "Error"
           );
         } else {
           showNotification("Failed to add Admin", "error", "Error");
         }
         console.error("Error adding Admin:", error);
       } finally {
         setLoading(false);
       }
     };
    
  return (
    <div>
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      {isAddAdminModalOpen && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "95%", // Adjust width for smaller screens
            }}
          >
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header bg-primary">
                <h5 className="modal-title text-white">Add New Admin</h5>
                <button
                  type="button"
                  className="close"
                  onClick={toggleAddAdminModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div
                className="modal-body"
                style={{
                  maxHeight: "50vh", // Set maximum height
                  overflowY: "auto", // Enable vertical scrolling
                }}
              >
                <form onSubmit={handleAddAdmin}>
                  <div className="form-row">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <p style={{ color: "red", margin: 0 }}>
                        {" "}
                        Personal Details{" "}
                        <hr style={{ border: "1px solid black" }} />
                      </p>
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="designation">Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        id="designation"
                        placeholder="Enter Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="branch">Branch</label>
                      <input
                        type="text"
                        className="form-control"
                        id="branch"
                        placeholder="Enter Branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter Password"
                        value={password}
                        max={"20"}
                        min={"8"}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        max={"20"}
                        min={"8"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <p style={{ color: "red", margin: 0 }}>
                        Permissions <hr style={{ border: "1px solid black" }} />
                      </p>
                    </div>

                    <div className="form-group col-md-12 mt-3">
                      <input
                        type="checkbox"
                        id="allowAddAdmin"
                        checked={allowAddAdmin}
                        onChange={(e) => setAllowAddAdmin(e.target.checked)}
                      />
                      <label htmlFor="allowAddAdmin" className="ml-2">
                        Grant permission to add new administrators
                      </label>
                    </div>

                    <div className="form-group col-md-12 ">
                      <input
                        type="checkbox"
                        id="allowSettings"
                        checked={allowSettings}
                        onChange={(e) => setAllowSettings(e.target.checked)}
                      />
                      <label htmlFor="allowSettings" className="ml-2">
                        Grant access to the Settings tab
                      </label>
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="checkbox"
                        id="allowAccessAlumniPost"
                        checked={allowAccessAlumniPost}
                        onChange={(e) =>
                          setallowAccessAlumniPost(e.target.checked)
                        }
                      />
                      <label
                        htmlFor="allowAccessAlumniPost"
                        className="ml-2"
                      >
                        Grant permission to use the Alumni Post tab 
                      </label>
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="checkbox"
                        id="allowAccessAlumniJoinRequest"
                        checked={allowAccessAlumniJoinRequest}
                        onChange={(e) =>
                          setAllowAccessAlumniJoinRequest(e.target.checked)
                        }
                      />
                      <label
                        htmlFor="allowAccessAlumniJoinRequest"
                        className="ml-2"
                      >
                        Grant access to the Alumni Join Request tab
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={toggleAddAdminModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleAddAdmin}
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdmin;
