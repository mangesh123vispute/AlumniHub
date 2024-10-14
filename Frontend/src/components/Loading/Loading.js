// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // Import the CSS for styling

const LoadingSpinner = ({ isLoading,text="Loading..." }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <img src="./loading.gif" alt="Loading..." className="loading-spinner" style={{width:"3em", height:"3em"}} />
      
      <p style={{marginTop:"0.3em", marginLeft:"0.6em"}} >{text}</p>
    </div>
  );
};

export default LoadingSpinner;
