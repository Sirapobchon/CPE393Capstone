import React, { useState, useEffect } from 'react';
import './TicTacToeAI.css';
import dog_icon from '../Assets/element/p&c/BigDog.png';
import cat_icon from '../Assets/element/p&c/BigCat.png';
import BGvid from "../Assets/CloudBg.mp4";
import resetbutton from '../Assets/element/resetbutt.png';
import header from '../Assets/element/3x3banner.png';
import axios from 'axios';

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
      setLock(true);
    }
  };

  useEffect(() => {
    if (count % 2 !== 0 && !lock && aiTurn) {
      const timeout = setTimeout(() => {
        aiMove();
      }, 500); // Adjust the delay as needed
      return () => clearTimeout(timeout);
    }
  }, [count, lock, aiTurn]);

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
  
  
  

  const handleClick = (e, num) => {
    if (!lock && !aiTurn) {
      togglePlayer(num);
      setAiTurn(true); // Set AI's turn to true after player makes a move
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
        ((sizeA === sizeB && sizeB === sizeC) ||
          (sizeA >= sizeB && sizeA >= sizeC) ||
          (sizeB >= sizeA && sizeB >= sizeC) ||
          (sizeC >= sizeA && sizeC >= sizeB))
      ) 
      {
        if (playerA === 'username') {
          /*axios.get('/api/users/addleader', { username: 'username', wincount: 1})
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('There was an error!', error);
            });*/
        }
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
      <div className="Size">
        <button className="PieceSizeS" onClick={() => setSelectedSize('S')}>
          S
        </button>
        <button className="PieceSizeM" onClick={() => setSelectedSize('M')}>
          M
        </button>
        <button className="PieceSizeL" onClick={() => setSelectedSize('L')}>
          L
        </button>
      </div>

      <button className="reset" onClick={handleReset}>
        <img src={resetbutton} alt="Reset button" />
      </button>
    </div>
  );
};

export default TicTacToeAI;
