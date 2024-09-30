import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate instead of useHistory

const ResetPassword = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/reset-password-confirm/${uidb64}/${token}/`,
        {
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );
      setMessage(response.data.detail);
      navigate("/login"); // use navigate instead of history.push
    } catch (error) {
      setMessage(error.response.data.detail || "An error occurred.");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
