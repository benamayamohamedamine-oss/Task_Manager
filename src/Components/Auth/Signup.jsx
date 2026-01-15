import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));
    alert("Account created!");
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <div className="input-box">
          <input name="username" placeholder="Username" required onChange={handleChange} />
          <br /><br />
          <input name="email" placeholder="Email" required onChange={handleChange} />
          <br /><br />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <br /><br />
          <input type="password" name="confirm" placeholder="Confirm Password" required onChange={handleChange} />
        </div>

        <div className="btn-box">
          <input type="submit" value="Create Account" />
        </div>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
