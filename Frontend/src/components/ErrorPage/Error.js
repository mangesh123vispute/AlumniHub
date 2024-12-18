import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div style={styles.container}>
      <div style={styles.errorContent}>
        <h3 style={styles.errorCode}>
          <i className="fas fa-exclamation-triangle" style={styles.icon} /> 404
        </h3>
        <p style={styles.message}>
          <strong>Oops! Page not found.</strong>
        </p>
        <p style={styles.subMessage}>
          We couldn't find the page you're looking for. Meanwhile, you can
          <Link to="/" style={styles.link}>
            {" "}
            return to the website.
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
  errorContent: {
    textAlign: "center",
    color: "#343a40", // Dark color for better visibility
    width: "90%", // Responsive width
    maxWidth: "600px", // Limit max width for larger screens
  },
  errorCode: {
    fontSize: "4rem", // Adjusted for default screen size
    color: "#ffc107", // AdminLTE warning color
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

export default Error;
