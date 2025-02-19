// src/App.tsx
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./app/login/LoginPage";
import DashBoard from "./components/DashBoard";
import SignUp from "./app/login/SignUp";
import Home from "./components/Home";
import JoinSession from "./components/JoinSession";
import CreateSession from "./components/CreateSession";
import Navbar from "./components/Navbar";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div >
        {" "}
        {/* Padding for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/createSession" element={<CreateSession />} />
          <Route path="/joinSession" element={<JoinSession />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
