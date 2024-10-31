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
          </Link>{" "}
         
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
  },
  errorContent: {
    textAlign: "center",
    color: "#343a40", // Dark color for better visibility
  },
  errorCode: {
    fontSize: "6rem",
    color: "#ffc107", // AdminLTE warning color
  },
  icon: {
    marginRight: "10px",
  },
  message: {
    fontSize: "1.5rem",
    color: "#343a40", // Dark color for better visibility
  },
  subMessage: {
    margin: "10px 0",
    color: "#495057", // Slightly lighter dark color for sub-message
  },
  link: {
    color: "#007bff",
    textDecoration: "underline",
  },
  searchForm: {
    marginTop: "20px",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    padding: "10px",
    border: "1px solid #ced4da",
    borderRadius: "0.25rem",
    width: "300px",
  },
  inputGroupAppend: {
    display: "flex",
  },
  button: {
    backgroundColor: "#ffc107",
    border: "none",
    padding: "10px 15px",
    borderRadius: "0.25rem",
    cursor: "pointer",
  },
};

export default Error;
