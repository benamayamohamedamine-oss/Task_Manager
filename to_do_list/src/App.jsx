import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componet/Login.jsx";
import Sign from "./componet/sign.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
