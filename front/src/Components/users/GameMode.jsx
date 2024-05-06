import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameMode.css";
import BGvid from "../Assets/CloudBg.mp4";
import fourthbut from "../Assets/element/ai.png";
import threebut from "../Assets/element/local.png";
import backbut from "../Assets/element/back.png";
import gamemodett from "../Assets/element/gamemodett.png";
import dirt from "../Assets/element/dirt.png";
import benchwbush from "../Assets/element/benchwbush.png";
import treewstone from "../Assets/element/treewstone.png";
import ballooncat from "../Assets/element/ballooncat.gif";
import dogrun from "../Assets/element/dogrun.gif";
import sleepycat from "../Assets/element/sleepycat.gif";
import clicksound from "../SFX/interface-button.mp3";
import TicTacToe from "../TicTacToe/TicTacToe";

const clickaudio = new Audio(clicksound);
function GameMode() {
  const navigate = useNavigate();
  const handlelocal = () => {
    navigate("/ticTacToe"); //Local
    clickaudio.play();
  };
  const handleAI = () => {
    navigate("/ticTacToeAI"); //AI
    clickaudio.play();
  };
  const handleBack = () => {
    navigate("/MainGame");
    clickaudio.play();
  };

  return (
    <div className="GameModepage">
      <img className="GameModett" src={gamemodett} alt="Game Mode tt"></img>
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <img className="treewstone" src={treewstone} alt="Tree with Stone"></img>
      <div className="benchContainer">
        <img
          className="benchwbush"
          src={benchwbush}
          alt="Bench with Bush"
        ></img>
        <img className="sleepycat" src={sleepycat} alt="Sleepycat"></img>
      </div>
      <img className="dogrun" src={dogrun} alt="dogrun"></img>
      <img className="ballooncat" src={ballooncat} alt="ballooncat"></img>

      <img className="dirt1" src={dirt} alt="dirt"></img>
      <img className="dirt2" src={dirt} alt="dirt"></img>
      <img className="dirt3" src={dirt} alt="dirt"></img>

      <button className="threebut" onClick={handlelocal}>
        <img src={threebut} alt="local button" className="button-img"></img>
      </button>
      <button className="fourthbut" onClick={handleAI}>
        <img src={fourthbut} alt="AI button" className="button-img"></img>
      </button>
      <button className="BackBut2" onClick={handleBack}>
        <img src={backbut} alt="back button" className="button-img"></img>
      </button>
    </div>
  );
}

export default GameMode;
