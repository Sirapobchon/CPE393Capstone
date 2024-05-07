import React, { useState } from 'react'
import './TicTacToe.css'
import dog_icon from '../Assets/element/p&c/BigDog.png'
import cat_icon from '../Assets/element/p&c/BigCat.png'
import BGvid from "../Assets/CloudBg.mp4";
import resetbutton from "../Assets/element/resetbutt.png";
import header from "../Assets/element/3x3banner.png";
import Sbut from "../Assets/element/Sbutton.png";
import Mbut from "../Assets/element/Mbutton.png";
import Lbut from "../Assets/element/Lbutton.png";
import sizebx from "../Assets/element/sizebox.png";
import bgboard from "../Assets/element/boardgame.png";
import clicksound from "../SFX/interface-button.mp3";
const clickaudio = new Audio(clicksound);

let data = [
  ["", 1],
  ["", 1],
  ["", 1],
  ["", 1],
  ["", 1],
  ["", 1],
  ["", 1],
  ["", 1],
  ["", 1],
]; // Each element now has a size property

const TicTacToe = () => {
  const [selectedSize, setSelectedSize] = useState('S'); // Current selected size
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  // const [remainingSPieces, setRemainingSPieces] = useState(3);
  // const [remainingMPieces, setRemainingMPieces] = useState(2);
  // const [remainingLPieces, setRemainingLPieces] = useState(2);

  const handleReset = (e) => {
    clickaudio.play();
    e.preventDefault();
    window.location.reload();
  }

  const toggle = (e, num) => {
    if (lock || data[num][0] !== "") {
      const existingSize = data[num][1];
      const newSize = getSelectedSizeValue();

      if (newSize > existingSize) {
        // Overtake smaller piece
        data[num][0] = count % 2 === 0 ? 'Dog' : 'Cat';
        data[num][1] = newSize;
        e.target.innerHTML = `<img src='${data[num][0] === 'Dog' ? dog_icon : cat_icon}' style="width: ${newSize * 50}px">`; // Adjust image size based on size
        setCount(count + 1);
        const winner = calculateWinner();
        if (winner) {
          alert(`${winner} wins!`);
          setLock(true);
        }
      }
      return;
    }
    
    data[num][0] = count % 2 === 0 ? 'Dog' : 'Cat';
    data[num][1] = getSelectedSizeValue(); // Set size for the new piece
    e.target.innerHTML = `<img src='${data[num][0] === 'Dog' ? dog_icon : cat_icon}' style="width: ${data[num][1] * 40}px">`;
    setCount(count + 1);

    // Check for a winner
    const winner = calculateWinner();
    if (winner) {
      alert(`${winner} wins!`);
      setLock(true);
    }
  };

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const [playerA, sizeA] = data[a];
      const [playerB, sizeB] = data[b];
      const [playerC, sizeC] = data[c];

      if (
        playerA &&
        playerA === playerB &&
        playerA === playerC &&
        (
          (sizeA === sizeB && sizeB === sizeC) ||
          (sizeA >= sizeB && sizeA >= sizeC) ||
          (sizeB >= sizeA && sizeB >= sizeC) ||
          (sizeC >= sizeA && sizeC >= sizeB)
        )
      ) {
        return playerA;
      }      
    }

    return null;
  };

  const getSelectedSizeValue = () => {
    if (selectedSize === 'S') {
      return 1;
    } else if (selectedSize === 'M') {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <div>
      <img className="title" src={header} alt="Login header"></img>
      <video className="AnimationBg" src={BGvid} autoPlay muted loop></video>
      <div className='board'>
        <div className="row1">
          <div className="boxes1" onClick={(e) => { toggle(e, 0) }}></div>
          <div className="boxes1" onClick={(e) => { toggle(e, 1) }}></div>
          <div className="boxes1" onClick={(e) => { toggle(e, 2) }}></div>
        </div>
        <div className="row2">
          <div className="boxes1" onClick={(e) => { toggle(e, 3) }}></div>
          <div className="boxes1" onClick={(e) => { toggle(e, 4) }}></div>
          <div className="boxes1" onClick={(e) => { toggle(e, 5) }}></div>
        </div>
        <div className="row3">
          <div className="boxes1" onClick={(e) => { toggle(e, 6) }}></div>
          <div className="boxes1" onClick={(e) => { toggle(e, 7) }}></div>
          <div className="boxes1" onClick={(e) => { toggle(e, 8) }}></div>
        </div>

      </div>
      
        <button className="sizeS" onClick={() => setSelectedSize('S')}>
        <img src={Sbut} alt="S button" />
        </button>
        <button className="sizeM" onClick={() => setSelectedSize('M')}>
        <img src={Mbut} alt="M button" />
        </button>
        <button className="sizeL" onClick={() => setSelectedSize('L')}>
        <img src={Lbut} alt="L button" />
        </button>
        <img className="bgboard" src={bgboard} alt="board"></img>
        <img className="SIZEBOX" src={sizebx} alt="box"></img>
      <button className='reset1' onClick={handleReset}>
        <img src={resetbutton} alt="Reset button" />
      </button>
      </div>
    
  
    
  );
}
export default TicTacToe