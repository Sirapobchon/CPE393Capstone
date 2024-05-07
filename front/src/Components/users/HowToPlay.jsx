import React from 'react';
import { useNavigate } from 'react-router-dom';
import BGvid from "../Assets/CloudBg.mp4";
import BackBut from '../Assets/element/back.png';
import dirt from "../Assets/element/dirt.png";
import ldboard from "../Assets/element/htpboard.png";
import HTPbanner from "../Assets/element/htp.png";
import tree from "../Assets/element/tree.png";
import rbcat from "../Assets/element/rbcat.gif";

import clicksound from '../SFX/interface-button.mp3';
const clickaudio = new Audio(clicksound);

function HowToPlay() {
  const navigate = useNavigate();

  const handleBack = () => {
    clickaudio.play();
    navigate('/');
  };

  return (
    <div className="page">
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <button className="Backbut" onClick={handleBack}>
        <img src={BackBut} alt="Back button" className="button-img" />
      </button>
      <img className="tree" src={tree} alt="tree"></img>
      <img className="rbcat" src={rbcat} alt="rbcat"></img>
      <img className="ldboard" src={ldboard} alt="Leaderboard"></img>
      <img className="ldbanner" src={HTPbanner} alt="Leaderbanner"></img>
      <img className="dirt1" src={dirt} alt="dirt"></img>
      <img className="dirt2" src={dirt} alt="dirt"></img>
      <img className="dirt3" src={dirt} alt="dirt"></img>
    </div>
  );
}

export default HowToPlay;
