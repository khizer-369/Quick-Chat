import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/UserContext";
import axios from "axios";
import LeftSideBar from "../components/LeftSideBar";
import Chat from "../components/Chat";
import RightSideBar from "../components/RightSideBar";

const Home = () => {
  const { serverUrl, socket, setUnSeenCount } = useContext(DataContext);
  const [chatStatus, setChatStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [messages, setMessages] = useState([]);

  const getRealTimeMessages = () => {
    if (!socket) {
      return;
    }
    socket.on("message", (createdMessage) => {
      if (selectedUser?._id === createdMessage.senderId) {
        createdMessage.seen = true;
        console.log(true);
        setMessages((prevMessages) => [...prevMessages, createdMessage]);
        axios.post(`${serverUrl}/message-seen`, { messageId: createdMessage._id }, { withCredentials: true });
      }
      else {
        setUnSeenCount((prevCount) => ({ ...prevCount, [createdMessage.senderId]: (prevCount?.[createdMessage.senderId] || 0) + 1 }));
      }
    });
  }

  const leaveRealTimeMessages = () => {
    if (socket) {
      socket.off("message");
    }
  }

  useEffect(() => {
    getRealTimeMessages();
    return () => {
      leaveRealTimeMessages();
    }
  }, [socket, selectedUser])

  const handleDownload = () => {
    axios.get(previewImage, { responseType: "blob", }).then((response) => {
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {previewImage && (<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-evenly items-center z-50 l duration-300">
        <div className="w-[90%] flex justify-between">
          <img src="./src/assets/download_icon.png" alt="download icon" className="h-6 cursor-pointer" onClick={() => {
            handleDownload();
          }} />
          <img src="./src/assets/cross_icon.png" alt="cross icon" className="h-8 cursor-pointer" onClick={() => {
            setPreviewImage(null);
          }} />
        </div>
        <img src={previewImage} alt="image" className="h-[67%] w-[90%] md:h-130 md:w-130 rounded-sm scale-100 transition-transform duration-300" />
      </div>
      )}
      <div className="h-full md:h-[85%] w-full md:w-[95%] lg:w-[85%] backdrop-blur-xl md:border-2 md:border-gray-600 md:rounded-2xl grid grid-rows-1 grid-cols-1 md:grid-rows-1 md:grid-cols-4 overflow-hidden">
        <LeftSideBar chatStatus={chatStatus} setChatStatus={setChatStatus} setSelectedUser={setSelectedUser} setMessages={setMessages} />
        {chatStatus && <Chat chatStatus={chatStatus} setChatStatus={setChatStatus} selectedUser={selectedUser} setSelectedUser={setSelectedUser} messages={messages} setMessages={setMessages} setPreviewImage={setPreviewImage} />}
        <RightSideBar chatStatus={chatStatus} selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Home;