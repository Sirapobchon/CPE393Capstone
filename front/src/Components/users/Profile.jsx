import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import BGvid from "../Assets/CloudBg.mp4";

import dirt from '../Assets/element/dirt.png';
import usrtt from '../Assets/element/username.png';
import emailtt from '../Assets/element/email.png';
import passtt from '../Assets/element/password.png';
import BackBut from "../Assets/element/back.png";
import Editbut from "../Assets/element/editbutton.png";
import Savebut from "../Assets/element/savebutton.png";

import clicksound from "../SFX/interface-button.mp3";
const clickaudio = new Audio(clicksound);

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const username = localStorage.getItem('username'); // Get the username from localStorage
      const response = await fetch(`http://localhost:8080/api/users/getuser?username=${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };
  

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  const handleEditToggle = () => {
    clickaudio.play();
    setEditable(prevEditable => !prevEditable);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      alert('User data updated successfully!');
      // Disable editing after saving
      setEditable(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data');
    }
  };

  const handleBack = () => {
    clickaudio.play();
    navigate('/');
  };

  return (
    <div className="ProfilePage">
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <body className="Body">
        <div>
          <img className="usrtt" src={usrtt} alt="Username"></img>
          <img className="emailtt" src={emailtt} alt="Email"></img>
          <img className="passtt" src={passtt} alt="Password"></img>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="reciveUsername">
                <input
                  className="Textbox"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  readOnly={!editable}
                  required
                />
              </div>
              <div className="reciveEmail">
                <input
                  className="Textbox"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  readOnly={!editable}
                  required
                />
              </div>
              <div className="recivePassword">
                <input
                  className="Textbox"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  readOnly={!editable}
                  required
                />
              </div>

              <button className="EditButton" onClick={handleEditToggle}>
                {editable ?  
                  <img src={Editbut} alt="Edit button" className="button-img"></img>
                  : 
                  <img src={Savebut} alt="Save button" className="button-img"></img>
                }
              </button>
              <button className="Backbut" onClick={handleBack}>
                <img src={BackBut} alt="Back button" className="button-img"></img>
              </button>
            </form>
          )}
        </div>
      </body>

      {/* Footer */}
      <footer className="Footer">
        <img className="dirt1" src={dirt} alt="Dirt"></img>
        <img className="dirt2" src={dirt} alt="Dirt"></img>
        <img className="dirt3" src={dirt} alt="Dirt"></img>
      </footer>
    </div>
  );
}

export default Profile;
