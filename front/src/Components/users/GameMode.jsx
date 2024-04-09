import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GameMode.css";
import BGvid from "../Assets/CloudBg.mp4";
import fourthbut from "../Assets/element/4x4.png";
import threebut from "../Assets/element/3x3.png";
import backbut from "../Assets/element/back.png";
import gamemodett from "../Assets/element/gamemodett.png";
import dirt from "../Assets/element/dirt.png";
import benchwbush from "../Assets/element/benchwbush.png";
import treewstone from "../Assets/element/treewstone.png";
import ballooncat from "../Assets/element/ballooncat.gif";
import dogrun from "../Assets/element/dogrun.gif";
import sleepycat from "../Assets/element/sleepycat.gif";
import clicksound from "../SFX/interface-button.mp3";

const clickaudio = new Audio(clicksound);
function GameMode() {
  const navigate = useNavigate();
  const handleFourthtable = () => {
    navigate("/4x4Board");
    clickaudio.play();
  };
  const handleThreetable = () => {
    navigate("/3x3Board");
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
      <img className="benchwbush" src={benchwbush} alt="Bench with Bush"></img>
      <img className="sleepycat" src={sleepycat} alt="Sleepycat"></img>
      <img className="dogrun" src={dogrun} alt="dogrun"></img>
      <img className="ballooncat" src={ballooncat} alt="ballooncat"></img>

      <img className="dirt1" src={dirt} alt="Login Board"></img>
      <img className="dirt2" src={dirt} alt="Login Board"></img>
      <img className="dirt3" src={dirt} alt="Login Board"></img>

      <button className="threebut" onClick={handleFourthtable}>
        <img src={threebut} alt="3x3 button"></img>
      </button>
      <button className="fourthbut" onClick={handleThreetable}>
        <img src={fourthbut} alt="4x4 button"></img>
      </button>
      <button className="BackBut2" onClick={handleBack}>
        <img src={backbut} alt="back button"></img>
      </button>
    </div>
  );
}

export default GameMode;
