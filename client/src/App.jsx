import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Requests from "./pages/Requests"

const App = () => {
  return (
    <div className="text-white bg-[url('./src/assets/bgImage.svg')] bg-cover bg-center bg-no-repeat">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/requests' element={<Requests />} />
      </Routes>
    </div>
  )
}

export default App
