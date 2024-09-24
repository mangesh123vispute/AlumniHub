// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // Import the CSS for styling

const LoadingSpinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <img src="./loading.gif" alt="Loading..." className="loading-spinner" />
      
      <p style={{marginTop:"0.3em", marginLeft:"0.6em"}} >Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
