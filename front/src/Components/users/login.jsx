import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import BGvid from "../Assets/CloudBg.mp4";
import loginbut from "../Assets/element/Login.png";
import Regisbut from "../Assets/element/Register.png";
import Noacc from "../Assets/element/noacc.png";
import BackBut from "../Assets/element/back.png";
import LoginBoard from "../Assets/element/loginboard.png";
import usrtt from "../Assets/element/username.png";
import passtt from "../Assets/element/password.png";
import logintt from "../Assets/logintt.png";
import dirt from "../Assets/element/dirt.png";
import clicksound from "../SFX/interface-button.mp3";

const clickaudio = new Audio(clicksound);
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (username !== "" && password !== "") {
      const myHeaders = new Headers();
      clickaudio.play();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: username,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:8080/api/users/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success === 1) {
            alert(`Welcome! ${username} let go to login page.`);
            navigate("/mainGame");
          } else {
            alert("login fail");
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("Please enter both username and password");
    }
  };
  const handleRegister = () => {
    navigate("/register");
    clickaudio.play();
  };
  const handleBack = () => {
    navigate("/home");
    clickaudio.play();
  };
  return (
    <div className="LoginPage">
      {/* Header */}
      <header className="Header">
        <img className="logintt" src={logintt} alt="Login tt"></img>{" "}
        {/* header content */}
      </header>

      {/* Body */}
      <body className="Body">
        <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>{" "}
        {/* background */}
        <img className="usrtt1" src={usrtt} alt="Login Board"></img>{" "}
        {/* body content */}
        <img className="passtt1" src={passtt} alt="Login Board"></img>
        <img className="LoginBoard" src={LoginBoard} alt="Login Board"></img>
        <div>
          <div className="reciveUsername1">
            <input
              className="Textbox"
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="recivePassword1">
            <input
              className="Textbox"
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="loginbut3" onClick={handleLogin}>
            <img src={loginbut} alt="Login Button" className="button-img"></img>
          </button>
          <p className="NoAcc">
            <img src={Noacc} alt="No account ?"></img>
          </p>
          <button className="RegisBut1" onClick={handleRegister}>
            <img
              src={Regisbut}
              alt="Register button"
              className="button-img"
            ></img>
          </button>
          <button className="Backbut1" onClick={handleBack}>
            <img src={BackBut} alt="Back button" className="button-img"></img>
          </button>
        </div>
      </body>

      {/* Footer */}
      <footer className="Footer">
        <img className="dirt1" src={dirt} alt="Login Board"></img>{" "}
        {/* footer content */}
        <img className="dirt2" src={dirt} alt="Login Board"></img>
        <img className="dirt3" src={dirt} alt="Login Board"></img>
      </footer>
    </div>
  );
}
