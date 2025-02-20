// // src/App.tsx
// import { useState } from "react";
// import { BrowserRouter, useLocation } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
// import LoginPage from "./app/login/LoginPage";
// import DashBoard from "./components/DashBoard";
// import SignUp from "./app/login/SignUp";
// import Home from "./components/Home";
// import JoinSession from "./components/JoinSession";
// import CreateSession from "./components/CreateSession";
// import Navbar from "./components/Navbar";

// function App() {
//   const [isSidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <BrowserRouter>
//       <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div >
//         {" "}
//         {/* Padding for fixed navbar */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/dashboard" element={<DashBoard />} />
//           <Route path="/createSession" element={<CreateSession />} />
//           <Route path="/joinSession" element={<JoinSession />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// src/App.tsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./app/login/LoginPage";
import DashBoard from "./components/DashBoard";
import SignUp from "./app/login/SignUp";
import Home from "./components/Home";
import JoinSession from "./components/JoinSession";
import CreateSession from "./components/CreateSession";
import Navbar from "./components/Navbar";
import AddCandidateForm from "./components/AddCandidateForm";
import CandidateList from "./components/CandidateList";
import SessionDetails from "./components/SessionDetails";

function AppContent() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <>
      {location.pathname.trim() === "/" ||
      location.pathname.trim() === "/login" ? null : (
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/createSession" element={<CreateSession />} />
          <Route path="/add-candidate/:session_id" element={<AddCandidateForm />} />
          <Route path="/session/:session_id" element={<SessionDetails />} />


          <Route path="/joinSession" element={<JoinSession />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
