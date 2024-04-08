import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainGame.css";
import BGvid from "../Assets/MainGamebg.mp4";
import playbut from "../Assets/element/play.png";
import leaderbut from "../Assets/element/Leaderboard.png";
import characterbut from "../Assets/element/character.png";
import logoutbut from "../Assets/element/loguot.png";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function MainGame() {
  const navigate = useNavigate();
  const handlePlay = () => {
    navigate("/play");
  };
  const handleLeader = () => {
    navigate("/Leaderboard");
  };
  const handleCharacter = () => {
    navigate("/Character");
  };
  const handleLogout = () => {
    navigate("/home");
  };

  return (
    <div className="MainGamepage">
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <button className="Playbut" onClick={handlePlay}>
        <img src={playbut} alt="Play Button"></img>
      </button>
      <button className="Leaderbut" onClick={handleLeader}>
        <img src={leaderbut} alt="Leaderboard Button"></img>
      </button>
      <button className="Characterbut" onClick={handleCharacter}>
        <img src={characterbut} alt="Character Button"></img>
      </button>
      <button className="logoutbut" onClick={handleLogout}>
        <img src={logoutbut} alt="Logout Button"></img>
      </button>
    </div>
  );
}

export default MainGame;
