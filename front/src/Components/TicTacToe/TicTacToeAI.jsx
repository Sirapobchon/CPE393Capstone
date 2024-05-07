import React, { useState, useEffect } from 'react';
import './TicTacToeAI.css';
import dog_icon from '../Assets/element/p&c/BigDog.png';
import cat_icon from '../Assets/element/p&c/BigCat.png';
import BGvid from "../Assets/CloudBg.mp4";
import resetbutton from '../Assets/element/resetbutt.png';
import Sbut from "../Assets/element/Sbutton.png";
import Mbut from "../Assets/element/Mbutton.png";
import Lbut from "../Assets/element/Lbutton.png";
import sizebx from "../Assets/element/sizebox.png";
import bgboard from "../Assets/element/boardgame.png";
import header from '../Assets/element/3x3banner.png';
//import axios from 'axios';

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

const TicTacToeAI = () => {
  const [selectedSize, setSelectedSize] = useState('S'); // Current selected size
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [aiTurn, setAiTurn] = useState(false); // Track whether it's the AI's turn

  const handleReset = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const toggleAI = (num) => {
    data[num][0] = 'Cat'; // Always set the player as Cat
    data[num][1] = getSelectedSizeValue();
    const tile = document.getElementsByClassName('boxes')[num];
    tile.innerHTML = `<img src='${cat_icon}' style="width: ${data[num][1] * 40}px">`;
    setCount(count + 1);

    const winner = calculateWinner();
    if (winner) {

      alert(`${winner} wins!`);
      setLock(true);
    }
  };

  const togglePlayer = (num) => {
    data[num][0] = count % 2 === 0 ? 'Dog' : 'Cat'; // Alternates between Dog and Cat based on count
    data[num][1] = getSelectedSizeValue();
    const tile = document.getElementsByClassName('boxes')[num];
    tile.innerHTML = `<img src='${
      data[num][0] === 'Dog' ? dog_icon : cat_icon
    }' style="width: ${data[num][1] * 40}px">`;
    setCount(count + 1);

    const winner = calculateWinner();
    if (winner) {
      alert(`${winner} wins!`);
      winnerleaderupadate(winner);
      setLock(true);
    }
  };

  const aiMove = () => {
    let num;
  
    // Check if the board is full
    if (isBoardFull()) {
      alert("It's a draw!");
      setLock(true); // Lock the board to prevent further moves
      return;
    }
  
    // Check if AI can win in the next move
    for (let i = 0; i < 9; i++) {
      if (data[i][0] === '') {
        data[i][0] = 'Cat';
        data[i][1] = getSelectedSizeValue();
        if (calculateWinner() === 'Cat') {
          toggleAI(i);
          setAiTurn(false);
          return;
        }
        // Reset the tile
        data[i][0] = '';
        data[i][1] = 1;
      }
    }
  
    // Check if player can win in the next move and block it
    for (let i = 0; i < 9; i++) {
      if (data[i][0] === '') {
        data[i][0] = 'Dog';
        data[i][1] = getSelectedSizeValue();
        if (calculateWinner() === 'Dog') {
          toggleAI(i);
          setAiTurn(false);
          return;
        }
        // Reset the tile
        data[i][0] = '';
        data[i][1] = 1;
      }
    }
  
    // Try to place larger pieces on smaller ones once space starts to run out
    for (let size = 3; size >= 1; size--) {
      for (let i = 0; i < 9; i++) {
        if (data[i][0] === '' && data.some(([_, tileSize]) => tileSize < size)) {
          data[i][0] = 'Cat';
          data[i][1] = size;
          toggleAI(i);
          setAiTurn(false);
          return;
        }
      }
    }
  
    // If no winning moves or blocking moves, choose a random tile
    do {
      num = Math.floor(Math.random() * 9);
    } while (data[num][0] !== ''); // Loop until an empty tile is found
  
    // Choose a random size between 1 and 3
    const randomSize = Math.floor(Math.random() * 3) + 1;
    
    // Place the AI's piece with the selected random size
    data[num][0] = 'Cat';
    data[num][1] = randomSize;
  
    toggleAI(num);
    setAiTurn(false); // Set AI's turn to false after making a move
  };
  
  const isBoardFull = () => {
    return data.every(([player]) => player !== '');
  };
  
  useEffect(() => {
    if (count % 2 !== 0 && !lock && aiTurn) {
      const timeout = setTimeout(() => {
        aiMove();
      }, 500); // Adjust the delay as needed
      return () => clearTimeout(timeout);
    }
  }, [count, lock, aiTurn, aiMove]); // Include aiMove in the dependency array

  const handleClick = (e, num) => {
    if (!lock && !aiTurn) {
      togglePlayer(num);
      setAiTurn(true); // Set AI's turn to true after player makes a move
      if (calculateWinner()) {
        setLock(true); // Prevent further moves if a winner is already determined
      }
    }
  };
  
  const winnerleaderupadate = (playerA) => {
    if (playerA === 'Dog') {
          const username = localStorage.getItem('username'); // Assuming username is stored in local storage
          console.log('Dog won', username);
          // Call the putLeaderboard endpoint to increment win count
          fetch('http://localhost:8080/api/users/addleader', {
            method: 'PUT',
            headers: new Headers(),
            body: JSON.stringify({ email: username }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success === 1) {
                console.log('Win count incremented successfully');
              } else {
                console.error('Failed to increment win count:', data.message);
              }
            })
            .catch((error) => {
              console.error('Error updating win count:', error);
            });
        }
  }


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
  
      //console.log('Checking line:', lines[i]);
      //console.log('Players and sizes:', playerA, sizeA, playerB, sizeB, playerC, sizeC);
  
      if (
        playerA &&
        playerA === playerB &&
        playerA === playerC &&
        ((sizeA === sizeB && sizeB === sizeC) ||
          (sizeA >= sizeB && sizeA >= sizeC) ||
          (sizeB >= sizeA && sizeB >= sizeC) ||
          (sizeC >= sizeA && sizeC >= sizeB))
      ) {
        //console.log('Winner:', playerA);
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
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => handleClick(e, 0)}></div>
          <div className="boxes" onClick={(e) => handleClick(e, 1)}></div>
          <div className="boxes" onClick={(e) => handleClick(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => handleClick(e, 3)}></div>
          <div className="boxes" onClick={(e) => handleClick(e, 4)}></div>
          <div className="boxes" onClick={(e) => handleClick(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => handleClick(e, 6)}></div>
          <div className="boxes" onClick={(e) => handleClick(e, 7)}></div>
          <div className="boxes" onClick={(e) => handleClick(e, 8)}></div>
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

      <button className="reset" onClick={handleReset}>
        <img src={resetbutton} alt="Reset button" />
      </button>
    </div>
  );
};

export default TicTacToeAI;
