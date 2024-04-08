import './App.css';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import { Route, Routes } from "react-router-dom"
import Login from './Components/users/login';
import Header from './Components/header/header';
import Register from './Components/users/register';
import Leaderboard from './Components/Leaderboard/leaderboard';
import Home from './Components/users/Home';
import HowToPlay from './Components/users/HowToPlay';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<TicTacToe  />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/HowToPlay' element={<HowToPlay />}></Route>
      </Routes>
    </>
  );
}

export default App;
