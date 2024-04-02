import React, { useState } from "react";
import {useNavigate}  from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        if(username !== "" && password !== ""){
            alert(`Welcome ${username}!`);
            navigate('/');
        }else{
            alert('Please enter both username and password');
        }
    }
    const handleRegister = () => {
        navigate('/register');
    }
    return (
        <div className=" container mx-auto">
            <div className="flex justify-center items-center mt-[10rem]">
            <div className="border-4 border-solid border-cyan-400 rounded-md w-[20rem] bg-transparent px-4 flex items-center flex-col">
                <h1 className=" text-white font-bold text-xl my-4">Login</h1>
                <div className="my-2">
                    <p className="text-white font-bold">Username</p>
                    <input type="text" className="border-2 border-solid px-2 border-black text-white bg-transparent outline-none rounded-md" placeholder="username" 
                    required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <p className="text-white font-bold">Password</p>
                    <input type="password" className="border-2 border-solid px-2 text-white border-black bg-transparent outline-none rounded-md"
                    placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="border-2 border-solid border-black bg-white text-black rounded-md w-[5rem] my-4
                hover:border-cyan-800 hover:bg-orange-600 ease-in-out duration-200 hover:text-white"
                onClick={handleLogin}>Login</button>
                <p className="text-black font-bold">Didn't have an account?</p>
                <button className="border-2 border-solid border-black bg-white text-black rounded-md w-[5rem] my-4
                hover:border-cyan-800 hover:bg-orange-600 ease-in-out duration-200 hover:text-white"
                onClick={handleRegister}>Register</button>
            </div>
        </div>
        </div>
    )
}