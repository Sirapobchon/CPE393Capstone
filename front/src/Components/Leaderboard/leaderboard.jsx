import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./leaderboard.css";
import BGvid from "../Assets/CloudBg.mp4";
import BackBut from "../Assets/element/back.png";
import id from "../Assets/element/id.png";
import usr from "../Assets/element/usr.png";
import score from "../Assets/element/score.png";
import sort from "../Assets/element/sort.png";
import clicksound from "../SFX/interface-button.mp3";
import trophy from "../Assets/element/trophy.png";
import ldbanner from "../Assets/element/ldbanner.png";
import ldboard from "../Assets/element/ldboard.png";
import tree from "../Assets/element/tree.png";
import moutain2 from "../Assets/element/moutain2.png";
import dirt from "../Assets/element/dirt.png";

const clickaudio = new Audio(clicksound);

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Fetch data from ours backend server
    async function fetchData() {
      await fetch("http://localhost:8080/api/users/leader")
        .then((response) => response.json())
        .then((data) => setPlayers(data)) //I don't think this is working @Sirapobchon
        .catch((error) => console.error("Error fetching players:", error));
    }
    fetchData();
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
    navigate("/mainGame");
  };

  return (
    <div className="page">
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>

      <img className="ldboard" src={ldboard} alt="Leaderboard"></img>
      <img className="ldbanner" src={ldbanner} alt="Leaderbanner"></img>
      <img className="tree" src={tree} alt="tree"></img>
      <img className="moutain2" src={moutain2} alt="moutain2"></img>
      <img className="trophy" src={trophy} alt="trophy"></img>

      <button className="sort" onClick={sortPlayersByScore}>
        <img src={sort} alt="sort button"></img>{" "}
      </button>
      <button className="Backbut1" onClick={handleBack}>
        <img src={BackBut} alt="Back button" className="button-img"></img>
      </button>
      <table>
        <thead>
          <tr>
            <th className="Identify">
              {" "}
              <img src={id} alt="id title"></img>
            </th>
            <th className="Name">
              <img src={usr} alt="username title"></img>
            </th>
            <th className="Score">
              <img src={score} alt="score title"></img>
            </th>
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

      <img className="dirt1" src={dirt} alt="Dirt"></img>
      <img className="dirt2" src={dirt} alt="Dirt"></img>
      <img className="dirt3" src={dirt} alt="Dirt"></img>
    </div>
  );
}

export default Leaderboard;
