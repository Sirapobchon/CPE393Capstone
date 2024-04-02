import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [nickname, setNickname] = useState("");
    const handleRegister = () => {
        if(username !== "" && password !== "" && email !== "" &&  nickname !== "" &&  rePassword === password) {
            alert(`Welcome! ${nickname} let go to login page.`);
            navigate('/login');
        }else{
            alert('Please enter all infomation');
        }
    }
    return(
        <div className="container mx-auto">
            <div className="flex justify-center items-center mt-[10rem]">
            <div className="border-4 border-solid border-cyan-400 rounded-md w-[20rem] bg-transparent px-4 flex items-center flex-col">
                <h1 className=" text-white font-bold text-xl my-4">Register</h1>
                <div className="my-2">
                    <p className="text-white font-bold my-2">Username</p>
                    <input type="text" className="border-2 border-solid px-2 border-black text-white bg-transparent outline-none rounded-md" placeholder="username" 
                    required value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <p className="text-white font-bold my-2">Nickname</p>
                    <input type="text" className="border-2 border-solid px-2 border-black text-white bg-transparent outline-none rounded-md" placeholder="nickname" 
                    required value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    <p className="text-white font-bold my-2">Email</p>
                    <input type="text" className="border-2 border-solid px-2 border-black text-white bg-transparent outline-none rounded-md" placeholder="email" 
                    required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <p className="text-white font-bold my-2">Password</p>
                    <input type="password" className="border-2 border-solid px-2 text-white border-black bg-transparent outline-none rounded-md"
                    placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="text-white font-bold my-2">Re-Password</p>
                    <input type="password" className="border-2 border-solid px-2 border-black text-white bg-transparent outline-none rounded-md" placeholder="re-password" 
                    required value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                </div>
                <button className="border-2 border-solid border-black bg-white text-black rounded-md w-[5rem] my-4
                hover:border-cyan-800 hover:bg-orange-600 ease-in-out duration-200 hover:text-white"
                onClick={handleRegister}>Register</button>
            </div>
        </div>
        </div>
    )
}

export default Register;