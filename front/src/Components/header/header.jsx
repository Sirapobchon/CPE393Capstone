import React from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import "./header.css";

export default function Navbar() {
  
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Assuming username is stored in local storage

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from storage
    localStorage.setItem('isLoggedIn', false);
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        PawClaw
      </Link>
      <ul>
        <CustomLink to="/leaderboard">Leaderboard</CustomLink>
        <CustomLink to="/GameMode">Game</CustomLink>
        <CustomLink to="/MainGame">Main Game</CustomLink>
        {username ? (
          <>
            <li>Welcome, {username}</li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <CustomLink to="/login">Login</CustomLink>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}