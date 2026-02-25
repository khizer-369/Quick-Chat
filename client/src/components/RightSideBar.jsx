import React, { useContext } from 'react';
import { DataContext } from '../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const RightSideBar = ({ chatStatus, selectedUser }) => {
  const { serverUrl } = useContext(DataContext);

  const logOutHandler = () => {
    axios.post(`${serverUrl}/logout`, {}, { withCredentials: true }).then(() => {
      location.reload();
    }).catch((error) => {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    })
  }

  return (
    <div className={chatStatus ? "bg-gray-600/40 hidden md:block" : "col-start-3 col-end-5 bg-gray-600/40 hidden md:block"}>
      {chatStatus ? <div className='h-full flex flex-col justify-between items-center'>
        <div className='h-[50%] w-full flex flex-col justify-center items-center gap-2 border-b border-gray-500'>
          <img src={selectedUser?.profilePhotoUrl ? selectedUser.profilePhotoUrl : "/avatar_icon.png"} alt="profile image" className='h-20 w-20 rounded-full' />
          <h1 className='text-xl'>{selectedUser.userName}</h1>
          <p className='text-center'>{selectedUser.bio}</p>
        </div>
        <div className='h-[50%] w-full flex flex-col-reverse items-center'>
          <button className='h-10 w-45 bg-purple-500 rounded-full cursor-pointer mb-4' onClick={logOutHandler}>Logout</button>
        </div>
      </div> : <div className='h-full flex flex-col justify-center items-center gap-3'>
        <img src="/logo_icon.svg" alt="logo" className='h-18' />
        <h1 className='text-xl'>Chat anytime, anywhere</h1>
      </div>}
    </div>
  )
}

export default RightSideBar
