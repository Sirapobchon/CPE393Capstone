import React, { useState , useEffect } from 'react';
import {useNavigate}  from "react-router-dom";
import './leaderboard.css'
import bg from '../Assets/element/leaderbg2.mp4'
import BackBut from '../Assets/element/back.png'
import id from '../Assets/element/id.png'
import usr from '../Assets/element/usr.png'
import score from '../Assets/element/score.png'
import sort from '../Assets/element/sort.png'
import { PrismaClient } from '@prisma/client'
import clicksound from '../SFX/interface-button.mp3'

const prisma = new PrismaClient()
const clickaudio = new Audio(clicksound);

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
      // Fetch data from your backend server
      fetch('/api/players')
        .then((response) => response.json())
        .then((data) => setPlayers(data))
        .catch((error) => console.error('Error fetching players:', error));
    }, []); // Empty dependency array ensures this effect runs once when the component mounts
    
  const navigate = useNavigate();
  // Function to sort players by score
  const sortPlayersByScore = () => {
    clickaudio.play();
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  };
  const handleBack = () => {
    clickaudio.play();
    navigate('/home');
  }

  return (
    <div className="page">
      <video className="AnimationBg" src={bg} autoPlay muted loop></video> 
      <button className="sort" onClick={sortPlayersByScore}>
      <img src={sort}alt="sort button"></img> </button>
      <button className="Backbut" onClick={handleBack}>
                    <img src={BackBut}alt="Back button"></img>
                </button>
      <table>
        <thead>
          <tr>
            <th className="Identify"> <img src={id}alt="id title"></img></th>
            <th className="Name"><img src={usr}alt="username title"></img></th>
            <th className="Score"><img src={score}alt="score title"></img></th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
