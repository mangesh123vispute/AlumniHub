import React, { useEffect } from "react";
import Swal from "sweetalert2";
import "./Notification.css"; // Import the custom CSS file

const Notification = ({
  message,
  isOpen,
  onClose,
  icon = "success",
  title = "Notification",
}) => {
  useEffect(() => {
    if (isOpen) {
      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: "Okay",
        customClass: {
          popup: "custom-swal-popup", // Use a custom class for styling
        },
      }).then(() => {
        onClose(); // Close the notification
      });
    }
  }, [isOpen, message, icon, title, onClose]);

  return null; // This component doesn't render anything visible
};

export default Notification;
