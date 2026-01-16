// src/Components/Auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please sign up.");
      return;
    }

    if (
      data.username === savedUser.username &&
      data.password === savedUser.password
    ) {
      // ✅ save auth info
      localStorage.setItem("isAuth", "true");
      localStorage.setItem("username", data.username);

      setIsAuth(true);
      navigate("/");
    } else {
      alert("Wrong credentials ❌");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="input-box">
          <input name="username" placeholder="Username" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        </div>

        <div className="btn-box">
          <input type="submit" value="Login" />
        </div>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
