import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; // eslint-disable-next-line
// import MediaQuery, { useMediaQuery } from "react-responsive";
import BGvid from "../Assets/registerbg.mp4";
import loginbut from "../Assets/element/Login.png";
import signupbut from "../Assets/element/signup.png";
import backbut from "../Assets/element/back.png";
import { PrismaClient } from '@prisma/client'
import clicksound from '../SFX/interface-button.mp3'

const prisma = new PrismaClient()
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
      //Currently not fully working
      await prisma.profile.create({
        data: {
          username,
          //nickname,
          email,
          password
        },
      })
      alert(`Welcome! ${username} let go to login page.`);
      navigate("/login");
    } else {
      alert("Please enter all infomation");
    }
  };
  const handleLogin = () => {
    clickaudio.play()
    navigate("/login");
  };
  const handleBack = () => {
    clickaudio.play()
    navigate("/home");
  };
  //   const handleMediaQueryChange = (matches) => {
  //     // Handle media query change here
  //     console.log("Desktop or laptop:", matches);
  //   };

  return (
    <div className="RegisterPage">
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <div>
        <div className="reciveEmail">
          <input className="Textbox"
            type="text"
            placeholder="email"
            required
            value={email}
            onClick={() => clickaudio.play()}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="reciveUsername">
          <input className="Textbox"
            type="text"
            placeholder="username"
            required
            value={username}
            onClick={() => clickaudio.play()}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="recivePassword">
          <input className="Textbox"
            type="password"
            placeholder="password"
            required
            value={password}
            onClick={() => clickaudio.play()}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="reciveConfirmPassword">
          <input className="Textbox"
            type="password"
            placeholder="confirm password"
            required
            value={rePassword}
            onClick={() => clickaudio.play()}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>

        <button className="BackBut1" onClick={handleLogin}>
          <img src={loginbut} alt="Login Button"></img>
        </button>
        <button className="RegisBut" onClick={handleRegister}>
          <img src={signupbut} alt="signup button"></img>
        </button>
        <button className="BackBut" onClick={handleBack}>
          <img src={backbut} alt="back button"></img>
        </button>
      </div>
    </div>
  );
}

export default Register;
