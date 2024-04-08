import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import BGvid from "../Assets/mainbg.mp4";
import loginbut from "../Assets/element/Login.png";
import leaderbut from "../Assets/element/Leaderboard.png";
import howtobut from "../Assets/element/HowToPlay.png";

function Home() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLeader = () => {
    navigate("/Leaderboard");
  };
  const handleHowTo = () => {
    navigate("/HowToPlay");
  };

  return (
    <div className="Homepage">
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <button className="loginbut" onClick={handleLogin}>
        <img src={loginbut} alt="Login Button"></img>
      </button>
      <button className="Leaderbut1" onClick={handleLeader}>
        <img src={leaderbut} alt="Leaderboard Button"></img>
      </button>
      <button className="HowTobut" onClick={handleHowTo}>
        <img src={howtobut} alt="Leaderboard Button"></img>
      </button>
    </div>
  );
}

export default Home;
