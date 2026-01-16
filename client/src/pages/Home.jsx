import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import Chat from "../components/Chat";
import RightSideBar from "../components/RightSideBar";

const Home = () => {
  const [chatStatus, setChatStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-[100%] md:h-[85%] w-full md:w-[95%] lg:w-[85%] backdrop-blur-xl border-2 border-gray-600 md:rounded-2xl grid grid-rows-1 grid-cols-1 md:grid-rows-1 md:grid-cols-4 overflow-hidden">
        <LeftSideBar chatStatus={chatStatus} setChatStatus={setChatStatus} setSelectedUser={setSelectedUser} />
        {chatStatus && <Chat chatStatus={chatStatus} setChatStatus={setChatStatus} selectedUser={selectedUser} />}
        <RightSideBar chatStatus={chatStatus} selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Home;
