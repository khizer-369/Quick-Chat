import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { DataContext } from '../context/UserContext';
import toast from 'react-hot-toast';
import EmojiPicker from "emoji-picker-react";

const Chat = ({ chatStatus, setChatStatus, selectedUser, setSelectedUser, messages, setMessages, setPreviewImage }) => {
  const { serverUrl, onlineUsers, setUsers } = useContext(DataContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [emojiDiv, setEmojiDiv] = useState(false);
  const file = useRef();
  const messagesEndRef = useRef();
  const formData = new FormData();
  formData.append("receiverId", selectedUser._id);
  formData.append("text", text);
  formData.append("image", image);

  const sendMessage = (e) => {
    e.preventDefault();
    setFrontendImage(null);
    axios.post(`${serverUrl}/send-message`, formData, { withCredentials: true }).then((response) => {
      setMessages((prevMessages) => [...prevMessages, response.data]);
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
    setText("");
    setImage(null);
  }

  const deleteUser = () => {
    axios.delete(`${serverUrl}/delete-user`, { withCredentials: true, data: { deleteUserId: selectedUser?._id } }).then((response) => {
      toast.success(response.data.message);
      setUsers(prevUsers => prevUsers.filter(user => user?._id !== selectedUser._id));
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  }

  const getFile = () => {
    file.current.click();
  }

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setFrontendImage(URL.createObjectURL(e.target.files[0]));
  }

  const setEmoji = (emojiData) => {
    setText(prev => prev + emojiData.emoji);
  }

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, frontendImage])
  return (
    <div className={chatStatus ? "col-start-1 col-end-5 md:col-start-2 md:col-end-4 flex flex-col items-center relative" : ""}>
      <div className='h-[12%] w-[95%] flex justify-between items-center border-b border-gray-500'>
        <div className='flex items-center gap-2'>
          <img src="./src/assets/arrow_icon.png" alt="arrow icon" className='h-8 cursor-pointer' onClick={() => {
            setChatStatus(false);
            setSelectedUser(null);

          }} />
          <img src={selectedUser?.profilePhotoUrl ? selectedUser.profilePhotoUrl : "./src/assets/avatar_icon.png"} alt="profile image" className='h-12 w-12 rounded-full' />
          <div>
            <h1 className='text-lg font-medium'>{selectedUser.userName}</h1>
            {onlineUsers.includes(selectedUser._id) ? <p className='text-sm text-green-500 tracking-wide'>Online</p> : <p className='text-sm text-gray-400'>Offline</p>}
          </div>
        </div>
        <div>
          <img src="./src/assets/delete_icon.png" alt="delete icon" className='h-6 mr-3 cursor-pointer' onClick={() => {
            setChatStatus(false);
            setSelectedUser(null);
            deleteUser();
          }} />
        </div>
      </div>
      <div className={`w-[90%] flex flex-col gap-4 pt-2 overflow-y-auto no-scrollbar ${frontendImage ? "h-[65%]" : "h-[80%]"}`}>
        {messages?.map((e, i) => {
          const time = new Date(e.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          });
          return (
            <div key={i} className={`flex ${e?.senderId === selectedUser._id ? "" : "justify-end"}`}>
              {(e?.text && !e?.imageUrl) && <div className={`w-fit max-w-[80%] flex gap-1 p-2 rounded-xl ${e?.senderId === selectedUser._id ? "bg-gray-700 rounded-tl-sm" : "bg-violet-600 rounded-tr-sm"}`}>
                <p className='text-justify'>{e?.text}<span className='text-xs text-gray-300 ml-2'>{time}</span></p>
              </div>}
              {(e?.imageUrl && !e?.text) && <div className={`h-55 w-48 flex justify-center items-center rounded-xl relative ${e?.senderId === selectedUser._id ? "bg-gray-700 rounded-tl-sm" : "bg-violet-600 rounded-tr-sm"}`}>
                <img src={e?.imageUrl} alt="image" className='h-53 w-45 rounded-xl cursor-pointer' onClick={() => {
                  setPreviewImage(e?.imageUrl);
                }} />
                <span className='text-xs text-gray-300 absolute bottom-2 right-2.5'>{time}</span>
              </div>}
              {(e?.text && e?.imageUrl) && <div className={`min-h-60 w-47 flex flex-col justify-center items-center rounded-xl ${e?.senderId === selectedUser._id ? "bg-gray-700 rounded-tl-sm" : "bg-violet-600 rounded-tr-sm"}`}>
                <img src={e?.imageUrl} alt="image" className='h-53 w-45 rounded-xl cursor-pointer' onClick={() => {
                  setPreviewImage(e?.imageUrl);
                }} />
                <p className='w-44'>{e?.text}<span className='text-xs text-gray-300 ml-2'>{time}</span></p>
              </div>}
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>
      {frontendImage && <div className='h-[15%] w-[95%] md:w-[90%] flex border-b border-gray-500'>
        <img src={frontendImage} alt="image" className='h-[95%] rounded-sm cursor-pointer' onClick={() => {
          setPreviewImage(frontendImage);
        }} />
      </div>}
      {emojiDiv && <div className='absolute h-[88%] w-[95%] md:w-[90%] flex flex-col-reverse items-end'>
        <EmojiPicker height={300} width={300} previewConfig={{ showPreview: false }} onEmojiClick={setEmoji} />
      </div>}
      <form className={`h-[12%] w-[95%] md:w-[90%] flex justify-between items-center`} onSubmit={(e) => {
        sendMessage(e);
      }}>
        <div className='h-[55%] md:h-[75%] w-[87%] md:w-[90%] bg-gray-100/12 flex justify-evenly items-center rounded-2xl md:rounded-full'>
          <input type="text" placeholder='Send a message' className='h-full w-[75%] md:w-[80%] outline-none' value={text} onChange={(e) => {
            setText(e.target.value);
          }} />
          <img src="./src/assets/emoji_icon.png" alt="emoji image" className='h-5 cursor-pointer' onClick={() => {
            setEmojiDiv(prev => !prev);
          }} />
          <img src="./src/assets/gallery_icon.svg" alt="gallery icon" className='h-5 cursor-pointer' onClick={() => {
            getFile();
          }} />
          <input type="file" className='hidden' ref={file} onChange={(e) => {
            imageHandler(e);
          }} />
        </div>
        <button>
          <img src="./src/assets/send_button.svg" alt="send button" className='h-9 cursor-pointer' />
        </button>
      </form>
    </div>
  )
}

export default Chat
