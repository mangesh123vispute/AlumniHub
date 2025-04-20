import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import baseurl from "../const.js";

const AddAdmin = () => {
  const [loading, setLoading] = useState(false);
  const {
    showNotification,
    toggleAddAdminModal,
    isAddAdminModalOpen,
    toggelreloadAdminData,
    message,
    isOpen,
    handleClose,
    icon,
    title,
    toggleModal,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    designation: "",
    branch: "",
    username: "",
    password: "",
    confirmPassword: "",
    allowSettings: false,
    allowAddAdmin: false,
    allowAccessAlumniPost: false,
    allowAccessAlumniJoinRequest: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      designation: "",
      branch: "",
      username: "",
      password: "",
      confirmPassword: "",
      allowSettings: false,
      allowAddAdmin: false,
      allowAccessAlumniPost: false,
      allowAccessAlumniJoinRequest: false,
    });
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      fullName,
      email,
      designation,
      branch,
      username,
      password,
      confirmPassword,
      allowSettings,
      allowAddAdmin,
      allowAccessAlumniPost,
      allowAccessAlumniJoinRequest,
    } = formData;

    if (!fullName || !email || !designation || !branch || !username || !password || !confirmPassword) {
      showNotification("All fields are required", "error", "Error");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error", "Error");
      setLoading(false);
      return;
    }

    const token = JSON.parse(localStorage.getItem("authTokens") || "{}");

    try {
      const response = await axios.post(
        `${baseurl}/register-admin/`,
        {
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
        },
        { headers: { Authorization: `Bearer ${token.access}` } }
      );

      if (response.status === 201) {
        showNotification("Admin added successfully", "success", "Success");
        resetForm();
        toggleModal();
        toggelreloadAdminData();
        toggleAddAdminModal();
      }
    } catch (error) {
      const errorData = error.response?.data || {};
      let errorMessage = errorData.detail || Object.values(errorData).flat()[0] || "Failed to add Admin";
      showNotification(errorMessage, "error", "Error");
      console.error("Error adding Admin:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingSpinner isLoading={loading} />
      <Notification message={message} isOpen={isOpen} onClose={handleClose} icon={icon} title={title} />

      {isAddAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative animate-fadeIn">
            <button
              onClick={toggleAddAdminModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-purple-600 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">Add New Admin</h2>

            <form onSubmit={handleAddAdmin} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["fullName", "Full Name"],
                ["username", "Username"],
                ["email", "Email"],
                ["designation", "Designation"],
                ["branch", "Branch"],
                ["password", "Password", "password"],
                ["confirmPassword", "Confirm Password", "password"],
              ].map(([id, label, type = "text"]) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700  mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500  dark:text-white"
                    placeholder={`Enter ${label}`}
                    min={id.includes("password") ? 8 : undefined}
                    max={id.includes("password") ? 20 : undefined}
                  />
                </div>
              ))}

              <div className="col-span-full mt-4">
                <h3 className="text-center text-lg font-semibold text-purple-700 mb-2">Permissions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    ["allowAddAdmin", "Permission to add new admins"],
                    ["allowSettings", "Access to Settings tab"],
                    ["allowAccessAlumniPost", "Access to Alumni Post tab"],
                    ["allowAccessAlumniJoinRequest", "Access to Join Requests"],
                  ].map(([id, label]) => (
                    <label key={id} className="inline-flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        id={id}
                        checked={formData[id]}
                        onChange={handleCheckboxChange}
                        className="text-purple-600 focus:ring-purple-500 rounded"
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="col-span-full flex justify-between mt-6">
                <button
                  type="button"
                  onClick={toggleAddAdminModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAdmin;
