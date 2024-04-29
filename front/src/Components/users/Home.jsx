import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import BGvid from "../Assets/mainbg.mp4";
import loginbut from "../Assets/element/Login.png";
import leaderbut from "../Assets/element/Leaderboard.png";
import howtobut from "../Assets/element/HowToPlay.png";
import clicksound from "../SFX/interface-button.mp3";
import MainGame from "./MainGame";

const clickaudio = new Audio(clicksound);
function Home() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
    clickaudio.play();
  };
  const handleLeader = () => {
    navigate("/Leaderboard");
    clickaudio.play();
  };
  const handleHowTo = () => {
    navigate("/HowToPlay");
    clickaudio.play();
  };
  const handleMainGame = () => {
    navigate("/MainGame");
    clickaudio.play();
  };

  return (
    <div className="Homepage">
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <button className="loginbut" onClick={handleMainGame}>
        <img src={loginbut} alt="Login Button" className="button-img" />
      </button>
      <button className="Leaderbut1" onClick={handleLeader}>
        <img src={leaderbut} alt="Leaderboard Button" className="button-img" />
      </button>
      <button className="HowTobut" onClick={handleHowTo}>
        <img src={howtobut} alt="How to Play Button" className="button-img" />
      </button>
    </div>
  );
}

export default Home;
