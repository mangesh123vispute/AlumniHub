import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h3 style={styles.errorCode}>
          <i className="fas fa-ban" style={styles.icon} /> 403
        </h3>
        <p style={styles.message}>
          <strong>You are not authorized to access this page.</strong>
        </p>
        <p style={styles.subMessage}>
          If you believe this is a mistake, please contact your administrator.
          Meanwhile, you can
          <Link to="/" style={styles.link}>
            {" "}
            return to the homepage.
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f4f6f9", // AdminLTE light background
    padding: "20px", // Added padding for smaller screens
  },
  content: {
    textAlign: "center",
    color: "#343a40", // Dark color for better visibility
    width: "90%", // Responsive width
    maxWidth: "600px", // Limit max width for larger screens
  },
  errorCode: {
    fontSize: "4rem", // Adjusted for default screen size
    color: "#dc3545", // Red color indicating an error
    marginBottom: "20px",
  },
  icon: {
    marginRight: "10px",
  },
  message: {
    fontSize: "1.2rem", // Smaller for better readability on smaller screens
    color: "#343a40", // Dark color for better visibility
  },
  subMessage: {
    margin: "10px 0",
    color: "#495057", // Slightly lighter dark color for sub-message
    fontSize: "1rem", // Adjusted for responsiveness
  },
  link: {
    color: "#007bff",
    textDecoration: "underline",
  },
};

// Add media queries for better responsiveness
const mediaStyles = `
  @media (max-width: 768px) {
    .errorCode {
      font-size: 3rem; // Smaller font size for tablets
    }
    .message, .subMessage {
      font-size: 1rem; // Adjusted for smaller screens
    }
  }

  @media (max-width: 480px) {
    .errorCode {
      font-size: 2.5rem; // Smaller font size for mobile screens
    }
    .message {
      font-size: 0.9rem; // Smaller for mobile
    }
    .subMessage {
      font-size: 0.8rem; // Smaller for mobile
    }
  }
`;

// Inject media styles into the page
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mediaStyles;
document.head.appendChild(styleSheet);

export default NotAuthorized;
