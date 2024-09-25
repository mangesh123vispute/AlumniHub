import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const Notification = ({ message, isOpen, onClose, icon = 'success', title = 'Notification' }) => {
  useEffect(() => {
    if (isOpen) {
      Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: 'Okay'
      }).then(() => {
        onClose(); // Close the notification
      });
    }
  }, [isOpen, message, icon, title, onClose]);

  return null; // This component doesn't render anything visible
};

export default Notification;
