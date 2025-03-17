// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Addbook from "./pages/Addbook";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-book" element={<Addbook />} />
      </Routes>
    </div>
  );
}

export default App;
