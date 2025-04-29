import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext.js";
import LoadingSpinner from "../Loading/Loading.js";
import Notification from "../Notification/Notification.js";
import { useNavigate, useParams, Link } from "react-router-dom";
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

  async function fetchUserDetails(email) {
    try {
      const response = await fetch(`${baseurl}/user-detail/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error("Failed to fetch user");
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
    setIsForgotPassPageOrActivateAccountPage(true);
    setFilter(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !email || !password || !confirmPassword || !role || !graduation_year || !graduation_month) {
      setLoading(false);
      await showNotification("Please fill all fields!", "warning", "Warning");
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      await showNotification("Passwords do not match!", "warning", "Warning");
      return;
    }

    try {
      const response = await fetch(`${baseurl}/activate-email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role, graduation_year, graduation_month }),
      });

      if (response.ok) {
        setLoading(false);
        await showNotification("Activation successful!", "success", "Success");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setLoading(false);
        await showNotification(errorData.detail || "Activation failed", "error", "Error");
      }
    } catch (err) {
      setLoading(false);
      await showNotification("Server error. Try again.", "error", "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-100">
      <LoadingSpinner isLoading={Loading} />
      <Notification
        message={message}
        isOpen={isOpen}
        onClose={handleClose}
        icon={icon}
        title={title}
      />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">Activate Account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Please complete your information to activate your account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Username</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className="fas fa-user absolute top-3 right-4 text-purple-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="fas fa-envelope absolute top-3 right-4 text-purple-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700">Grad Month</label>
              <input
                type="number"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={graduation_month}
                onChange={(e) => setGraduation_month(e.target.value)}
                min="1"
                max="12"
                required
                readOnly={role === "Student"}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Grad Year</label>
              <input
                type="number"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={graduation_year}
                onChange={(e) => setGraduation_year(e.target.value)}
                min="1983"
                max="2100"
                required
                readOnly={role === "Student"}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="fas fa-lock absolute top-3 right-4 text-purple-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className="fas fa-lock absolute top-3 right-4 text-purple-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 transition-all"
          >
            Send Confirmation Email
          </button>
        </form>

        <div className="flex justify-between text-sm text-purple-600 mt-6">
          <Link to="/" className="hover:underline">
            <i className="fas fa-home mr-1" /> Home
          </Link>
          <Link to="/register" className="hover:underline">
            <i className="fas fa-user-plus mr-1" /> Register
          </Link>
          <Link to="/login" className="hover:underline">
            <i className="fas fa-sign-in-alt mr-1" /> Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivateEmail;
