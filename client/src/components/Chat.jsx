import React from 'react'

const Chat = ({ chatStatus, setChatStatus, selectedUser }) => {
  return (
    <div className={chatStatus ? "col-start-1 col-end-5 md:col-start-2 md:col-end-4 flex flex-col items-center" : ""}>
      <div className='h-[12%] w-[95%] flex items-center gap-2 border-b border-gray-500'>
        <img src="./src/assets/arrow_icon.png" alt="arrow icon" className='h-8 cursor-pointer' onClick={() => {
          setChatStatus(false);
        }} />
        <img src={selectedUser.profilePic} alt="profile image" className='h-12 rounded-full' />
        <h1 className='text-lg font-medium'>{selectedUser.fullName}</h1>
      </div>
      <div className='h-[80%] w-[90%]'></div>
      <form className='h-[12%] w-[95%] md:w-[90%] flex justify-between items-center' onSubmit={(e) => {
        e.preventDefault();
      }}>
        <div className='h-[65%] md:h-[75%] w-[85%] md:w-[90%] bg-gray-100/12 flex justify-evenly items-center rounded-2xl md:rounded-full'>
          <input type="text" placeholder='Send a message' className='h-full w-[85%] outline-none' />
          <img src="./src/assets/gallery_icon.svg" alt="gallery icon" className='h-5 cursor-pointer' />
        </div>
        <button>
          <img src="./src/assets/send_button.svg" alt="send button" className='h-9 cursor-pointer' />
        </button>
      </form>
    </div>
  )
}

export default Chat
