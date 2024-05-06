import React from 'react';
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
import ProfilePage from './Components/users/Profile';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Mock function to check if user is logged in
const isAuthenticated = () => localStorage.getItem("isLoggedIn") === "true";

// Updated ProtectedRoute component to accept a component prop
const ProtectedRoute = ({ component: Component }) => (
  isAuthenticated() ? <Component /> : <Navigate to="/login" replace />
);

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<ProtectedRoute component={TicTacToe} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/MainGame" element={<ProtectedRoute component={MainGame} />} />
        <Route path="/GameMode" element={<ProtectedRoute component={GameMode} />} />
        <Route path="/HowToPlay" element={<HowToPlay />} />
        <Route path="/Profile" element={<ProtectedRoute component={ProfilePage} />} />
      </Routes>
    </>
  );
}

export default App;