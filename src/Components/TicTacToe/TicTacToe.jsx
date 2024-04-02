import React, { useState } from 'react'
import './TicTacToe.css'
import dog_icon from '../Assets/dog.png'
import cat_icon from '../Assets/cat.jpg'

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

    // Place new piece (no overtaking)
    
    data[num][0] = count % 2 === 0 ? 'Dog' : 'Cat';
    data[num][1] = getSelectedSizeValue(); // Set size for the new piece
    e.target.innerHTML = `<img src='${data[num][0] === 'Dog' ? dog_icon : cat_icon}' style="width: ${data[num][1] * 50}px">`;
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

      if (playerA && playerA === playerB && playerA === playerC &&
        (sizeA === sizeB && sizeB === sizeC ||
          (sizeA >= sizeB && sizeA >= sizeC) ||
          (sizeB >= sizeA && sizeB >= sizeC) ||
          (sizeC >= sizeA && sizeC >= sizeB))) {
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
    <div className='tic-container'>
      <h1 className="title">PawClaw <span>XO</span></h1>
      <div className='board'>
        <div className="row1">
          <div className="boxes" onClick={(e) => { toggle(e, 0) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 1) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 2) }}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => { toggle(e, 3) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 4) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 5) }}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => { toggle(e, 6) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 7) }}></div>
          <div className="boxes" onClick={(e) => { toggle(e, 8) }}></div>
        </div>

      </div>
      <div className="Size">
        <button className="PieceSizeS" onClick={() => setSelectedSize('S')}>S</button>
        <button className="PieceSizeM" onClick={() => setSelectedSize('M')}>M</button>
        <button className="PieceSizeL" onClick={() => setSelectedSize('L')}>L</button>
      </div>


      <button className='reset' onClick={handleReset}>Reset</button>
    </div>
  );
}
export default TicTacToe