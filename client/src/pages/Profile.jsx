import React, { useState } from 'react'
import AvatarIcon from "/src/assets/avatar_icon.png"

const Profile = () => {
  const [profilePic, setProfilePic] = useState(AvatarIcon);
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");

  const updateProfile = (e) => {
    e.preventDefault();
    setUserName("");
    setBio("");
  }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-screen w-full md:h-120 md:w-160 backdrop-blur-xl md:border-2 md:border-gray-600 md:rounded-xl flex flex-col justify-evenly items-center md:flex-row'>
        <img src="./src/assets/logo_icon.svg" alt="logo " className='h-40 md:hidden' />
        <form className='h-100 w-[90%] md:w-[60%] flex flex-col justify-between' onSubmit={(e) => {
          updateProfile(e);
        }}>
          <p className='text-lg'>Profile details</p>
          <div className='flex items-center gap-3'>
            <img src={profilePic} alt="profile pic" className='h-14' />
            <p>upload profile image</p>
          </div>
          <input type="text" value={userName} placeholder='User Name' className='h-10 w-full bg-transparent border-gray-500 border-2 rounded outline-none pl-2' onChange={(e) => {
            setUserName(e.target.value);
          }} required/>
          <textarea value={bio} placeholder='Bio...' className='h-35 w-full bg-transparent border-gray-500 border-2 rounded outline-none pl-2 pt-1' onChange={(e) => {
            setBio(e.target.value);
          }} required></textarea>
          <button className='h-11 w-full bg-purple-500 rounded-full text-lg cursor-pointer'>Save</button>
        </form>
        <img src="./src/assets/logo_icon.svg" alt="logo" className='h-100 w-[30%] hidden md:block' />
      </div>
    </div>
  )
}

export default Profile
