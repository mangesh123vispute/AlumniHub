import React from "react";
import { Link } from "react-router-dom";

const Maintenance = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h3 style={styles.title}>
          <i className="fas fa-tools" style={styles.icon} /> Under Maintenance
        </h3>
        <p style={styles.message}>
          <strong>We'll be back soon!</strong>
        </p>
        <p style={styles.subMessage}>
          We are currently performing some updates. Please check back later.
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
  title: {
    fontSize: "4rem", // Default font size
    color: "#17a2b8", // AdminLTE info color
    marginBottom: "20px",
  },
  icon: {
    marginRight: "10px",
  },
  message: {
    fontSize: "1.2rem", // Slightly smaller for better readability on small screens
    color: "#343a40", // Dark color for better visibility
  },
  subMessage: {
    margin: "10px 0",
    color: "#495057", // Slightly lighter dark color for sub-message
    fontSize: "1rem", // Adjusted size for responsiveness
  },
  link: {
    color: "#007bff",
    textDecoration: "underline",
  },
};

// Add media query for better responsiveness
const mediaStyles = `
  @media (max-width: 768px) {
    .title {
      font-size: 2.5rem; // Smaller font size for tablets
    }
    .message, .subMessage {
      font-size: 1rem; // Adjusted for smaller screens
    }
  }

  @media (max-width: 480px) {
    .title {
      font-size: 2rem; // Even smaller for mobile screens
    }
  }
`;

// Inject media styles into the page
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = mediaStyles;
document.head.appendChild(styleSheet);

export default Maintenance;
