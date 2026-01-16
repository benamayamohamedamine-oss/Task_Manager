import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <strong>Task Manager</strong>
      </div>

      <div className="nav-right">
        <span className="user-name">👤 {username}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Disconnect
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
