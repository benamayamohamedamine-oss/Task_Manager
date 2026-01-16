import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Navbar from "./Components/navbar/navbar";
import SetProject from "./SetProject";
import Frame from "./Components/MainFrame/Frame";

function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  return (
    <Router>

      {/* ✅ show navbar only when connected */}
      {isAuth && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={isAuth ? <SetProject /> : <Navigate to="/login" />}
        />

        <Route
          path="/frame"
          element={isAuth ? <Frame /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
