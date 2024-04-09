import React, { useState , useEffect } from 'react';
import {useNavigate}  from "react-router-dom";
import './Home.css'
import bg from '../Assets/element/HTPbg.mp4'
import BackBut from '../Assets/element/back.png'
import clicksound from "../SFX/interface-button.mp3";

const clickaudio = new Audio(clicksound);
function HowToPlay(){
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/home');
        clickaudio.play();
      }

      return (
        <div className="page">
          <video className="AnimationBg" src={bg} autoPlay muted loop></video>
          <button className="Backbut" onClick={handleBack}>
                    <img src={BackBut}alt="Back button"></img>
                </button>
          </div>
      )
}

export default HowToPlay