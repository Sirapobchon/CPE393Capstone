import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; // eslint-disable-next-line
// import MediaQuery, { useMediaQuery } from "react-responsive";
import BGvid from "../Assets/registerbg.mp4";
import loginbut from "../Assets/element/Login.png";
import signupbut from "../Assets/element/signup.png";
import backbut from "../Assets/element/back.png";

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
  const handleRegister = () => {
    if (
      username !== "" &&
      password !== "" &&
      email !== "" &&
      // nickname !== "" &&
      rePassword === password
    ) {
      alert(`Welcome! ${username} let go to login page.`);
      navigate("/login");
    } else {
      alert("Please enter all infomation");
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleBack = () => {
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
          <input
            type="text"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="reciveUsername">
          <input
            type="text"
            placeholder="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="recivePassword">
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="reciveConfirmPassword">
          <input
            type="password"
            placeholder="confirm password"
            required
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>

        <button className="loginbut" onClick={handleLogin}>
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
