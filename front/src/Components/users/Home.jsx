import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import BGvid from "../Assets/CloudBg.mp4";
import loginbut from "../Assets/element/Login.png";
import leaderbut from "../Assets/element/Leaderboard.png";
import howtobut from "../Assets/element/HowToPlay.png";
import clicksound from "../SFX/interface-button.mp3";
import cat from "../Assets/element/cat.png";
import dog from "../Assets/element/dog.png";
import dirt from "../Assets/element/dirt.png";
import PCtt from "../Assets/element/P&Cicon.png";

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

  return (
    <div className="Homepage">
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <button className="loginbut" onClick={handleLogin}>
        <img src={loginbut} alt="Login Button" className="button-img" />
      </button>
      <button className="Leaderbut1" onClick={handleLeader}>
        <img src={leaderbut} alt="Leaderboard Button" className="button-img" />
      </button>
      <button className="HowTobut" onClick={handleHowTo}>
        <img src={howtobut} alt="How to Play Button" className="button-img" />
      </button>

      <img className="PCtt" src={PCtt} alt="PCtt"></img>

      <img className="dog" src={dog} alt="dog"></img>
      <img className="cat" src={cat} alt="cat"></img>

      <img className="dirt1" src={dirt} alt="dirt"></img>
      <img className="dirt2" src={dirt} alt="dirt"></img>
      <img className="dirt3" src={dirt} alt="dirt"></img>
    </div>
  );
}

export default Home;
