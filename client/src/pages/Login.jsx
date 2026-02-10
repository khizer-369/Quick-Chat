import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { DataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { serverUrl, getUsersHandler } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    axios.post(`${serverUrl}/auth/login`, {
      email,
      password
    }, { withCredentials: true }).then((response) => {
      console.log(response.data.message);
      getUsersHandler();
      navigate("/");
    }).catch((error) => {
      console.log(error.response.data.message);
    })
    setEmail("");
    setPassword("");
  }

  return (
    <div className='backdrop-blur-xl h-screen w-full flex flex-col justify-evenly items-center'>
      <img src="./src/assets/logo_big.svg" alt="logo" className='h-20' />
      <form className='bg-white/8 h-[63%] w-[95%] sm:h-95 sm:w-85 flex flex-col justify-evenly items-center border-2 border-gray-600 rounded-lg' onSubmit={(e) => {
        loginHandler(e);
      }}>
        <h1 className='w-[90%] text-2xl'>Login</h1>
        <input type="email" placeholder='Email' value={email} className='w-[90%] h-10 border-2 border-gray-500 rounded-md pl-2 text-lg outline-none' required onChange={(e) => {
          setEmail(e.target.value);
        }} />
        <input type="password" placeholder='Password' value={password} className='w-[90%] h-10 border-2 border-gray-500 rounded-md pl-2 text-lg outline-none' required onChange={(e) => {
          setPassword(e.target.value);
        }} />
        <button className='w-[90%] h-10 bg-purple-500 rounded-md cursor-pointer text-xl'>Login</button>
        <div className='w-[90%]'>
          <p className='inline'>Create an account</p>
          <NavLink to={"/sign-up"} className='text-purple-500'> Click here</NavLink>
        </div>
      </form>
    </div>
  )
}

export default Login
