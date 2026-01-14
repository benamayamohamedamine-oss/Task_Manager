import React from "react";
import { BrowserRouter as Router,Route,Routes,Link } from  "react-router-dom";
import "./sign.css";
import Login from "./Login.jsx";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
function verif(){
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    if(p1.value !== p2.value){
      alert("Password not match");
    }
    else {
      alert("Sign up successful");
    }

}
function Sign(){
    return (
        <div className="wrapper">
            <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
            </Routes>
            </Router>
            <form action="">
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <FaRegUserCircle  className="icon"/>
                    <br /><br />
                    <input type="password" placeholder="Password" required name="p1" id="p1"/>
                    <FaLock className="icon"/>
                    <br /><br />
                    <input type="password" placeholder="Confirm Password" required  name="p2" id="p2"/>
                    <MdVerifiedUser className="icon"/>
                    <br /><br />
                </div>
                <div className="p2">
                <div className="btn-box">
                    <input type="submit" value="Sign Up" onclick={verif} />
                    <input type="reset" value="Reset" />
                </div>
                <h4>I have an account ? <Link to="/Login">login</Link></h4>
                </div>
            </form>
        </div>
    );
};

export default Sign;