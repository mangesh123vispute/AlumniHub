/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../Notification/Notification.js";
import baseurl from "../const.js";

const Register = () => {
  const navigate = useNavigate();
  const {
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
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    graduation_year: "",
    graduation_month: "",
    linkedin: "",
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

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 animate-fade-in">
          <div className="text-center mb-6">
            <Link to="/" className="text-3xl font-bold text-purple-600">
              AlumniX | <span className="text-gray-700">SSBT COET</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Register as an <b>Alumni</b>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  icon="fas fa-user"
                  placeholder="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
                <InputField
                  icon="fas fa-user"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <InputField
                  icon="fas fa-envelope"
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField
                  icon="fas fa-calendar-alt"
                  placeholder="Graduation Month (1-12)"
                  type="number"
                  name="graduation_month"
                  min="1"
                  max="12"
                  value={formData.graduation_month}
                  onChange={handleChange}
                />
                <InputField
                  icon="fas fa-calendar"
                  placeholder="Graduation Year"
                  type="number"
                  name="graduation_year"
                  min="1983"
                  max="2100"
                  value={formData.graduation_year}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Credentials */}
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-2">
                Credentials
              </h3>
              <InputField
                icon="fab fa-linkedin"
                placeholder="LinkedIn Profile URL"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            {/* Passwords */}
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-2">
                Security
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  icon="fas fa-lock"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <InputField
                  icon="fas fa-lock"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Register
            </button>
          </form>

          {/* Navigation */}
          <div className="mt-6 flex justify-around text-purple-600 text-sm">
            <Link to="/" className="hover:underline">
              <i className="fas fa-home mr-1"></i> Home
            </Link>
            <Link to="/send_activation_Email" className="hover:underline">
              <i className="fas fa-check-circle mr-1"></i> Activate
            </Link>
            <Link to="/login" className="hover:underline">
              <i className="fas fa-sign-in-alt mr-1"></i> Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

export const InputField = ({
  icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  min,
  max,
}) => (
  <div className="relative">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required
      min={min}
      max={max}
      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-300"
    />
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
      <i className={icon}></i>
    </div>
  </div>
);
