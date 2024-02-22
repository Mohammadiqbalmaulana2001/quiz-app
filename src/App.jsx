import React, {useState, useEffect} from "react";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

    return (
      <Router>
        <main className="flex justify-center min-h-screen bg-zinc-800 text-zinc-50 py-24">
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    );
}

export default App;