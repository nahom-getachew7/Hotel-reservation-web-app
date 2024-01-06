// LoadingOverlay.jsx
import React from "react";
import "./overlay.scss";

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingOverlay;
