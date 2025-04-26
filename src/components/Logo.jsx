import React from "react";
import { Link } from "react-router-dom";

function Logo({ width = "100px", className = "" }) {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      {/* Logo with text */}
      <div className="flex items-center">
        {/* Logo mark */}
        <div
          className="flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500"
          style={{ width: width, height: `calc(${width} * 0.8)` }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-2/3 h-2/3"
          >
            <path
              d="M12 3V21M8 7L12 3L16 7M8 17L12 21L16 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Logo text - hidden on mobile by default */}
        <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent hidden sm:block">
          BlogWave
        </span>
      </div>
    </Link>
  );
}

export default Logo;
