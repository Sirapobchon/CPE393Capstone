import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
//import BGvid from "../Assets/loginbg.mp4";
import loginbut from "../Assets/element/Login.png";
import Regisbut from "../Assets/element/Register.png";
import Noacc from "../Assets/element/noacc.png";
import BackBut from "../Assets/element/back.png";
import LoginBoard from "../Assets/element/loginboard.png";
import usrtt from "../Assets/element/username.png";
import passtt from "../Assets/element/password.png";
import logintt from "../Assets/logintt.png";
import dirt from "../Assets/element/dirt.png";
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (username !== "" && password !== "") {
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": username,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:8080/api/users/login", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    if(result.success === 1){
      alert(`Welcome! ${username} let go to login page.`);
      navigate('/mainGame')
  }
  else{
    alert("login fail")
  }
  })
  .catch((error) => console.error(error));
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
      <img className="logintt" src={logintt} alt="Login tt"></img>
      
      <img className="usrtt" src={usrtt} alt="Login Board"></img>
      <img className="passtt" src={passtt} alt="Login Board"></img>
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

        <button className="loginbut1" onClick={handleLogin}>
          <img src={loginbut} alt="Login Button"></img>
        </button>
        <p className="NoAcc">
          <img src={Noacc} alt="No account ?"></img>
        </p>
        <button className="RegisBut1" onClick={handleRegister}>
          <img src={Regisbut} alt="Register button"></img>
        </button>
        <button className="Backbut1" onClick={handleBack}>
          <img src={BackBut} alt="Back button"></img>
        </button>
      </div>
     <img className="dirt1" src={dirt} alt="Login Board"></img>
     <img className="dirt2" src={dirt} alt="Login Board"></img>
     <img className="dirt3" src={dirt} alt="Login Board"></img>
    </div>
  );
}
