import React, { useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { DataContext } from '../context/UserContext';
import axios from "axios";

const SignUp = () => {
  const { serverUrl } = useContext(DataContext);
  const [signUpPart, setSignUpPart] = useState(1);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    axios.post(`${serverUrl}/auth/sign-up`, {
      userName,
      email,
      password,
      bio
    }, { withCredentials: true }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error.response.data.message);
    })
    setUserName("");
    setEmail("");
    setPassword("");
    setBio("");
  }

  return (
    <div className='backdrop-blur-xl h-screen w-full flex flex-col justify-evenly items-center'>
      <img src="./src/assets/logo_big.svg" alt="logo" className='h-20' />
      <div className='bg-white/8 h-[70%] w-[95%] sm:h-110 sm:w-85 border-2 border-gray-600 rounded-lg'>
        {signUpPart === 1 ? <form className='h-full w-full flex flex-col justify-evenly items-center' onSubmit={(e) => {
          e.preventDefault();
          setSignUpPart(2);
        }}>
          <h1 className='w-[90%] text-2xl font-medium'>Sign Up</h1>
          <input type="text" placeholder='User Name' value={userName} className='h-10 w-[90%] border-2 border-gray-500 rounded-md pl-2 text-lg outline-none' required onChange={(e) => {
            setUserName(e.target.value);
          }} />
          <input type="email" placeholder='Email' value={email} className='h-10 w-[90%] border-2 border-gray-500 rounded-md pl-2 text-lg outline-none' required onChange={(e) => {
            setEmail(e.target.value);
          }} />
          <input type="password" placeholder='Password' value={password} className='h-10 w-[90%] border-2 border-gray-500 rounded-md pl-2 text-lg outline-none' required onChange={(e) => {
            setPassword(e.target.value);
          }} />
          <button className='h-10 w-[90%] rounded-md bg-purple-500 text-xl cursor-pointer'>Next</button>
          <div className='w-[90%]'>
            <p className='inline'>Already have an account?</p>
            <NavLink to={"/login"} className='text-purple-500'> Login here</NavLink>
          </div>
        </form> : <form className='h-full flex flex-col justify-evenly items-center' onSubmit={(e) => {
          signUpHandler(e);
        }}>
          <div className='w-[90%] flex justify-between items-center'>
            <h1 className='text-2xl'>Sign Up</h1>
            <img src="./src/assets/arrow_icon.png" alt="arrow icon" className='h-8 cursor-pointer' onClick={() => {
              setSignUpPart(1);
            }} />
          </div>
          <textarea placeholder='Bio' value={bio} className='h-40 w-[90%] border-2 border-gray-500 rounded-md text-lg outline-none pt-1 pl-2' required onChange={(e) => {
            setBio(e.target.value);
          }}></textarea>
          <button className='h-10 w-[90%] bg-purple-500 rounded-md cursor-pointer text-xl'>Sign Up</button>
          <div className='w-[90%]'>
            <p className='inline'>Already have an account?</p>
            <NavLink to={"/login"} className='text-purple-500'> Login here</NavLink>
          </div>
        </form>}
      </div>
    </div>
  )
}

export default SignUp
