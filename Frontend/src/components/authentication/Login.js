/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import baseurl from "../const.js";

const Login = () => {
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setFilter(false);
  }, [setFilter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password } = formData;

    if (!username || !password) {
      await showNotification(
        !username ? "Username is required" : "Password is required",
        "warning",
        "Warning"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseurl}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && response.status === 200) {
        setAuthTokens(data.token);
        setUser(jwtDecode(data.access));
        localStorage.setItem(
          "authTokens",
          JSON.stringify({
            access: data.access,
            refresh: data.refresh,
          })
        );

        await showNotification("Login successful", "success", "Success");
        toggleLogin();
        navigate("/myprofile");
      } else {
        await showNotification(
          data.detail || "Login failed. Please check credentials.",
          "warning",
          "Warning"
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("An error occurred during login.", error);
      await showNotification(
        "Something went wrong, please try again.",
        "error",
        "Error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-purple-200 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link
              to="/"
              className="text-purple-700 font-bold text-3xl tracking-wide"
            >
              AlumniX | <span className="text-purple-500 text-xl">SSBT COET</span>
            </Link>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-center text-xl font-semibold text-gray-700 mb-1">
              Login to your account
            </h2>
            <p className="text-sm text-gray-500 text-center mb-4">
              Enter your credentials to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    className="w-full px-4 py-2 pl-10 border placeholder:pl-5 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">
                    <i className="fas fa-user" />
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 pl-10 placeholder:pl-5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">
                    <i className="fas fa-lock" />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
              >
                Login
              </button>
            </form>

            <div className="flex flex-wrap justify-between items-center text-sm mt-5 text-purple-600">
              <Link to="/" className="hover:underline">
                <i className="fas fa-home mr-1" /> Home
              </Link>

              <div className="relative group">
                <span className="cursor-pointer hover:underline flex items-center">
                  <i className="fas fa-user-lock mr-1" /> Forgot Credentials
                  <i className="fas fa-chevron-down ml-1 text-xs" />
                </span>
                <div className="absolute z-10 bg-white border rounded shadow-md mt-2 p-2 hidden group-hover:block">
                  <Link
                    to="/forgot_password"
                    className="block px-3 py-1 hover:bg-gray-100"
                  >
                    <i className="fas fa-unlock-alt mr-1" />
                    Forgot Password
                  </Link>
                  <Link
                    to="/forgot_username"
                    className="block px-3 py-1 hover:bg-gray-100"
                  >
                    <i className="fas fa-user mr-1" />
                    Forgot Username
                  </Link>
                </div>
              </div>

              <Link to="/register" className="hover:underline">
                <i className="fas fa-user-plus mr-1" /> Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
