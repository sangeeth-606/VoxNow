// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./app/login/LoginPage";
import DashBoard from "./components/DashBoard";
import SignUp from "./app/login/SignUp";
import Home from "./components/Home";
import JoinSession from "./components/JoinSession";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/joinSession" element={<JoinSession />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
