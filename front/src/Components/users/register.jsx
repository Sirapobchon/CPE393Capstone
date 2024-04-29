import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; // eslint-disable-next-line
// import MediaQuery, { useMediaQuery } from "react-responsive";
import BGvid from "../Assets/CloudBg.mp4";
import registertt from "../Assets/element/registertt.png";
import emailtt from "../Assets/element/email.png";
import loginbut from "../Assets/element/Login.png";
import usrtt from "../Assets/element/username.png";
import passtt from "../Assets/element/password.png";
import cfpasstt from "../Assets/element/cfpass.png";
import signupbut from "../Assets/element/signup.png";
import backbut from "../Assets/element/back.png";
import dirt from "../Assets/element/dirt.png";
import RegisterBoard from "../Assets/element/smallerthanbiggerboard.png";

import clicksound from "../SFX/interface-button.mp3";
const clickaudio = new Audio(clicksound);

function Register() {
  //   const isDesktopOrLaptop = useMediaQuery(
  //     { minWidth: 1224 },
  //     undefined,
  //     (matches) => {
  //       handleMediaQueryChange(matches);
  //     }
  //   );

  //   const isTabletorMobile = useMediaQuery({ query: "(max-width: 800px)" });
  //   const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  //   const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  // const [nickname, setNickname] = useState("");
  const handleRegister = async () => {
    if (
      username !== "" &&
      password !== "" &&
      email !== "" &&
      // nickname !== "" &&
      rePassword === password
    ) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        username: username,
        email: email,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch("http://localhost:8080/api/users/register", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success === 1) {
            alert(`Welcome! ${username} let go to login page.`);
            navigate("/login");
          } else {
            alert("register fail");
          }
        })
        .catch((error) => console.error(error));
    } else {
      alert("Please enter all infomation");
    }
  };
  const handleLogin = () => {
    clickaudio.play();
    navigate("/login");
  };
  const handleBack = () => {
    clickaudio.play();
    navigate("/");
  };
  //   const handleMediaQueryChange = (matches) => {
  //     // Handle media query change here
  //     console.log("Desktop or laptop:", matches);
  //   };

  return (
    <div className="RegisterPage">
      <img className="registertt" src={registertt} alt="Register tt"></img>
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <img className="emailtt" src={emailtt} alt="Email tt"></img>
      <img className="usrtt" src={usrtt} alt="Username tt"></img>
      <img className="passtt" src={passtt} alt="Password tt"></img>
      <img className="cfpasstt" src={cfpasstt} alt="Confirm Password tt"></img>
      <img
        className="RegisterBoard"
        src={RegisterBoard}
        alt="Register Board"
      ></img>
      <div>
        <div className="reciveEmail">
          <input
            className="Textbox"
            type="text"
            placeholder="email"
            required
            value={email}
            onClick={() => clickaudio.play()}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="reciveUsername">
          <input
            className="Textbox"
            type="text"
            placeholder="username"
            required
            value={username}
            onClick={() => clickaudio.play()}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="recivePassword">
          <input
            className="Textbox"
            type="password"
            placeholder="password"
            required
            value={password}
            onClick={() => clickaudio.play()}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="reciveConfirmPassword">
          <input
            className="Textbox"
            type="password"
            placeholder="confirm password"
            required
            value={rePassword}
            onClick={() => clickaudio.play()}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>

        <button className="loginbut2" onClick={handleLogin}>
          <img src={loginbut} alt="Login Button" className="button-img"></img>
        </button>
        <button className="RegisBut" onClick={handleRegister}>
          <img src={signupbut} alt="signup button" className="button-img"></img>
        </button>
        <button className="BackBut4" onClick={handleBack}>
          <img src={backbut} alt="back button" className="button-img"></img>
        </button>
      </div>
      <img className="dirt1" src={dirt} alt="Dirt"></img>
      <img className="dirt2" src={dirt} alt="Dirt"></img>
      <img className="dirt3" src={dirt} alt="Dirt"></img>
    </div>
  );
}

export default Register;
