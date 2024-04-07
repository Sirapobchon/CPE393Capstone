import React, { useState , useEffect } from 'react';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
  
    useEffect(() => {
      // Fetch data from your backend server
      fetch('/api/players')
        .then((response) => response.json())
        .then((data) => setPlayers(data))
        .catch((error) => console.error('Error fetching players:', error));
    }, []); // Empty dependency array ensures this effect runs once when the component mounts
  

  // Function to sort players by score
  const sortPlayersByScore = () => {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  };

  return (
    <div>
      <h2>Leaderboard</h2>
      <button onClick={sortPlayersByScore}>Sort by Score</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
