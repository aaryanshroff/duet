import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthButton = () => {
  const TOKEN = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Logged in
  return (
    <div className="flex space-x-4">
      {TOKEN ? (
        <div className="flex space-x-4">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          <Link to="/matches" className="nav-link">
            Matches
          </Link>
          <button
            className="nav-link"
            onClick={handleLogOut}
            data-cy="logout-button"
          >
            Log Out
          </button>
        </div>
      ) : (
        <>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthButton;
