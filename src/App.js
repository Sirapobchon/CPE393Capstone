import './App.css';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import { Route, Routes } from "react-router-dom"
import Login from './Components/users/login';
import Header from './Components/header/header';
import Register from './Components/users/register';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<TicTacToe  />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
