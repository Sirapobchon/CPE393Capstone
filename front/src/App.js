import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import "./App.css";
import TicTacToe from "./Components/TicTacToe/TicTacToe";
import Login from "./Components/users/login";
import Header from "./Components/header/header";
import Register from "./Components/users/register";
import Leaderboard from "./Components/Leaderboard/leaderboard";
import Home from "./Components/users/Home";
import MainGame from "./Components/users/MainGame";
import GameMode from "./Components/users/GameMode";
import HowToPlay from "./Components/users/HowToPlay";

// Mock function to check if user is logged in
// Replace this with your actual authentication check
const isAuthenticated = () => {
  // Example check (you should replace this with actual logic)
  return localStorage.getItem("isLoggedIn") === "true";
};

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
        <Route path="/tictactoe" element={<ProtectedRoute><TicTacToe /></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>}></Route>
        <Route path="/MainGame" element={<ProtectedRoute><MainGame /></ProtectedRoute>}></Route>
        <Route path="/GameMode" element={<ProtectedRoute><GameMode /></ProtectedRoute>}></Route>
        <Route path="/HowToPlay" element={<ProtectedRoute><HowToPlay /></ProtectedRoute>}></Route>
      </Routes>
    </>
  );
}

export default App;