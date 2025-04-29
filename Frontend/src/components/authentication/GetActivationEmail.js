import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
import Notification from "../Notification/Notification.js";
import LoadingSpinner from "../Loading/Loading.js";
import baseurl from "../const.js";

const GetActivationEmail = () => {
  const [email, setEmail] = useState("");
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsForgotPassPageOrActivateAccountPage(true);
    setFilter(false);
  }, [setFilter, setIsForgotPassPageOrActivateAccountPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${baseurl}/send-activation-email/`,
        { email }
      );
      setLoading(false);

      if (response.status === 200) {
        showNotification(response.data.detail, "success", "Success");
      } else {
        showNotification(response.data.detail, "error", "Error");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      showNotification(
        error.response?.data?.detail ||
          "Failed to send activation email. Please try again.",
        "error",
        "Error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-white to-purple-100 p-4">
      <LoadingSpinner isLoading={loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />

      <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md shadow-xl rounded-2xl p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">
          Activate Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to receive an activation link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              className="w-full border border-purple-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="absolute left-3 top-2.5 text-purple-500">
              <i className="fas fa-envelope" />
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition-transform transform hover:-translate-y-0.5"
          >
            Send Activation Email
          </button>
        </form>

        <div className="flex justify-between mt-6 text-purple-600 text-sm">
          <Link to="/" className="hover:underline flex items-center">
            <i className="fas fa-home mr-1"></i> Home
          </Link>
          <Link to="/register" className="hover:underline flex items-center">
            <i className="fas fa-user-plus mr-1"></i> Register
          </Link>
          <Link to="/login" className="hover:underline flex items-center">
            <i className="fas fa-sign-in-alt mr-1"></i> Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetActivationEmail;
