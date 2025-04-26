// components/LoadingSpinner.jsx
import React from "react";

function LoadingSpinner({ className = "" }) {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-solid border-current border-r-transparent ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
