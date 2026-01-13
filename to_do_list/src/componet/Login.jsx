import React from "react";
import { Link } from "react-router-dom";
import "./login.css"; // CSS is in the same folder

const Login = () => {
  return (
    <div className="wrapper">
      <form>
        <h1>Login</h1>

        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <br /><br />
          <input type="password" placeholder="Password" required />
        </div>

        <div className="btn-box">
          <input type="submit" value="Login" />
          <input type="reset" value="Reset" />
        </div>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;