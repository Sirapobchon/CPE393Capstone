import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainGame.css";
import BGvid from "../Assets/CloudBg.mp4";
import playbut from "../Assets/element/play.png";
import leaderbut from "../Assets/element/Leaderboard.png";
import characterbut from "../Assets/element/character.png";
import logoutbut from "../Assets/element/loguot.png";
import rbcat from "../Assets/element/rbcat.gif";
import rbhotdog from "../Assets/element/rbhotdog.gif";
import dirt from "../Assets/element/dirt.png";

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
        <img src={playbut} alt="Play Button" className="button-img"></img>
      </button>
      <button className="Leaderbut" onClick={handleLeader}>
        <img
          src={leaderbut}
          alt="Leaderboard Button"
          className="button-img"
        ></img>
      </button>
      <button className="Characterbut" onClick={handleCharacter}>
        <img
          src={characterbut}
          alt="Character Button"
          className="button-img"
        ></img>
      </button>
      <button className="logoutbut" onClick={handleLogout}>
        <img src={logoutbut} alt="Logout Button" className="button-img"></img>
      </button>
      <img className="rbcat" src={rbcat} alt="rbcat"></img>
      <img className="rbhotdog" src={rbhotdog} alt="rbhotdog"></img>

      <img className="dirt1" src={dirt} alt="Login Board"></img>
      <img className="dirt2" src={dirt} alt="Login Board"></img>
      <img className="dirt3" src={dirt} alt="Login Board"></img>
    </div>
  );
}

export default MainGame;
