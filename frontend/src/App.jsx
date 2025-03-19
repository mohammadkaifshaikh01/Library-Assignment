// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Addbook from "./pages/Addbook";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Alluser from "./pages/Alluser";
import Allbooks from "./pages/Allbooks";

function App() {
  return (



    <div className="mx-4 sm:mx-[1%]">
      
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-book" element={<Addbook />} />
        <Route path="/allbooks" element={<Allbooks />} />
        <Route path="/getuser" element={<Alluser />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
