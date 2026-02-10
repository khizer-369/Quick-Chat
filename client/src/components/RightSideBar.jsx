import React, { useContext } from 'react'
import { DataContext } from '../context/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RightSideBar = ({ chatStatus, selectedUser }) => {
  const { serverUrl } = useContext(DataContext);
  const navigate = useNavigate();

  const logOutHandler = () => {
    axios.post(`${serverUrl}/logout`, {}, { withCredentials: true }).then((response) => {
      console.log(response.data.message);
      navigate("/login");
    }).catch((error) => {
      console.log(error.response.data.message);
    })
  }

  return (
    <div className={chatStatus ? "bg-gray-600/40 hidden md:block" : "col-start-3 col-end-5 bg-gray-600/40 hidden md:block"}>
      {chatStatus ? <div className='h-full flex flex-col justify-between items-center'>
        <div className='h-[50%] w-full flex flex-col justify-center items-center gap-2 border-b border-gray-500'>
          <img src={selectedUser?.profilePhotoUrl ? selectedUser.profilePhotoUrl : "./src/assets/avatar_icon.png"} alt="profile image" className='h-20 rounded-full' />
          <h1 className='text-xl'>{selectedUser.userName}</h1>
          <p className='text-center'>{selectedUser.bio}</p>
        </div>
        <div className='h-[50%] w-full flex flex-col'>
          <div className='h-[70%]'>
            <p className='pt-2 pl-2'>Media</p>
          </div>
          <div className='h-[30%] flex justify-center items-center'>
            <button className='h-10 w-45 bg-purple-500 rounded-full cursor-pointer' onClick={logOutHandler}>Logout</button>
          </div>
        </div>
      </div> : <div className='h-full flex flex-col justify-center items-center gap-3'>
        <img src="./src/assets/logo_icon.svg" alt="logo" className='h-18' />
        <h1 className='text-xl'>Chat anytime, anywhere</h1>
      </div>}
    </div>
  )
}

export default RightSideBar
