import React, { useContext, useEffect, useRef, useState } from 'react';
import AvatarIcon from "/src/assets/avatar_icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import { DataContext } from '../context/UserContext';

const Profile = () => {
  const { serverUrl, user } = useContext(DataContext);
  const [profilePic, setProfilePic] = useState(AvatarIcon);
  const [profilePhoto, setProfilePhoto] = useState();
  const [userName, setUserName] = useState();
  const [bio, setBio] = useState();
  const file = useRef();
  const formData = new FormData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.profilePhotoUrl) {
      setProfilePic(user.profilePhotoUrl);
    }
    setUserName(user?.userName);
    setBio(user?.bio);
  }, [user])

  formData.append("profilePhoto", profilePhoto);
  formData.append("userName", userName);
  formData.append("bio", bio);

  const click = () => {
    file.current.click();
  }

  const setImage = (e) => {
    setProfilePhoto(e.target.files[0]);
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  }

  const updateProfile = (e) => {
    e.preventDefault();
    axios.post(`${serverUrl}/profile-update`, formData, { withCredentials: true }).then((response) => {
      console.log(response.data.message);
      setProfilePic(AvatarIcon);
      setUserName(null);
      setBio(null);
      navigate("/");
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='h-screen w-full md:h-120 md:w-160 backdrop-blur-xl md:border-2 md:border-gray-600 md:rounded-xl flex flex-col justify-evenly items-center md:flex-row'>
        <NavLink to={"/"}>
          <img src="./src/assets/logo_icon.svg" alt="logo " className='h-40 md:hidden cursor-pointer' />
        </NavLink>
        <form className='h-100 w-[90%] md:w-[60%] flex flex-col justify-between' onSubmit={(e) => {
          updateProfile(e);
        }}>
          <p className='text-lg'>Profile details</p>
          <div className='flex items-center gap-3'>
            <img src={profilePic} alt="profile pic" className='h-14 w-14 rounded-full cursor-pointer' onClick={click} />
            <input type="file" className='hidden' ref={file} onChange={setImage} />
            <p>upload profile image</p>
          </div>
          <input type="text" value={userName} placeholder='User Name' className='h-10 w-full bg-transparent border-gray-500 border-2 rounded outline-none pl-2' onChange={(e) => {
            setUserName(e.target.value);
          }} required />
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
