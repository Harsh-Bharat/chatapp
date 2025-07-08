import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Loginpage from "./pages/Loginpage";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="relative w-full h-screen">
      {/* Background image as full-screen */}
      <div className="absolute inset-0 bg-[url('/src/assets/bgImage.svg')] bg-cover bg-center z-0" />

      {/* Foreground content on top of background */}
      <div className="relative z-10 h-full">
        <Toaster />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <Loginpage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
