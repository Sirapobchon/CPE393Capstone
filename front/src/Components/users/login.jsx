import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import BGvid from "../Assets/loginbg.mp4";
import loginbut from "../Assets/element/Login.png";
import Regisbut from "../Assets/element/Register.png";
import Noacc from "../Assets/element/noacc.png";
import BackBut from "../Assets/element/back.png";
import LoginBoard from "../Assets/element/loginboard.png";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (username !== "" && password !== "") {
      alert(`Welcome ${username}!`);
      navigate("/MainGame");
    } else {
      alert("Please enter both username and password");
    }
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div className="LoginPage">
      
      <img className="LoginBoard" src={LoginBoard} alt="Login Board"></img>
      <div>
        <div className="reciveUsername1">
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="recivePassword1">
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="loginbut" onClick={handleLogin}>
          <img src={loginbut} alt="Login Button"></img>
        </button>
        <p className="NoAcc">
          <img src={Noacc} alt="No account ?"></img>
        </p>
        <button className="RegisBut1" onClick={handleRegister}>
          <img src={Regisbut} alt="Register button"></img>
        </button>
        <button className="Backbut" onClick={handleBack}>
          <img src={BackBut} alt="Back button"></img>
        </button>
      </div>
    </div>
  );
}
