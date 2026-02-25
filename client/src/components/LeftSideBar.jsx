import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/UserContext";
import toast from "react-hot-toast";

const LeftSideBar = ({ chatStatus, setChatStatus, setSelectedUser, setMessages }) => {
  const { serverUrl, users, onlineUsers, unSeenCount, setUnSeenCount } = useContext(DataContext);
  const [findingUser, setFindingUser] = useState("");
  const [foundUsers, setFoundUsers] = useState();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!foundUsers) {
      return;
    }
    const Users = users.filter((e) => (e.userName.toLowerCase().includes(findingUser.toLowerCase())));
    setFoundUsers(Users);
  }, [findingUser]);

  useEffect(() => {
    setFoundUsers(users);
  }, [users])

  const logOutHandler = () => {
    axios.post(`${serverUrl}/logout`, {}, { withCredentials: true }).then(() => {
      location.reload();
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  }

  const messagesHandler = (id) => {
    axios.post(`${serverUrl}/selected-user-messages`, { selectedUserId: id }, { withCredentials: true }).then((response) => {
      setMessages(response.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
    })
  }

  return (
    <div
      className={
        chatStatus
          ? "hidden md:flex flex-col items-center bg-[#8185B2]/10"
          : "flex flex-col items-center col-start-1 col-end-5 md:col-start-1 md:col-end-3  bg-[#8185B2]/10"
      }
    >
      <div className="h-[15%] w-[90%] flex justify-between items-center px-4">
        <img src="/logo.png" alt="logo" className="h-8 md:h-7 lg:h-8" />
        <div className="relative">
          <img
            src="/menu_icon.png"
            alt="menu icon"
            className="h-6 cursor-pointer"
            onClick={() => {
              if (showMenu) {
                setShowMenu(false);
              }
              else {
                setShowMenu(true);
              }
            }}
          />
          {showMenu && <div className="bg-gray-800 h-30 w-28 absolute flex flex-col justify-between items-center top-10 right-0 rounded-lg">
            <NavLink to={"/profile"} className="h-[33%] w-[90%] border-b-2 border-gray-500 flex justify-center items-center cursor-pointer">
              <div>Profile</div>
            </NavLink>
            <NavLink to={"/requests"} className="h-[33%] w-[90%] border-b-2 border-gray-500 flex justify-center items-center cursor-pointer">
              <div>Requests</div>
            </NavLink>
            <div className="h-[33%] w-[90%] flex justify-center items-center cursor-pointer" onClick={logOutHandler}>
              <div>Logout</div>
            </div>
          </div>}
        </div>
      </div>
      <div className="h-[6%] sm:h-[7%] w-[90%] flex justify-around items-center bg-gray-800 rounded-3xl px-2">
        <input
          type="text"
          placeholder="Search User..."
          className="w-[80%] outline-none font-normal text-sm"
          value={findingUser}
          onChange={(e) => {
            setFindingUser(e.target.value);
          }}
        />
        <img
          src="/search_icon.png"
          alt="search icon"
          className="h-4"
        />
      </div>
      {foundUsers && foundUsers.length > 0 ? <div className="h-[78%] w-[85%] pt-4 flex flex-col overflow-y-auto no-scrollbar">
        {foundUsers.map((e, i) => {
          const isOnline = onlineUsers?.includes(e._id);
          const unSeen = unSeenCount[e._id];
          return (
            <div
              className="flex justify-between items-center gap-2 mb-2 cursor-pointer"
              key={i}
              onClick={() => {
                setChatStatus(true);
                setSelectedUser(e);
                messagesHandler(e._id);
                const { [e._id]: romoved, ...rest } = unSeenCount;
                setUnSeenCount(rest);
              }}
            >
              <div className="flex gap-2">
                <img
                  src={e.profilePhotoUrl ? e.profilePhotoUrl : "./src/assets/avatar_icon.png"}
                  alt="profile image"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h1>{e.userName}</h1>
                  <div>
                    {isOnline ? <p className="text-green-500 text-sm">Online</p> : <p className="text-gray-400 text-sm">Offline</p>}
                  </div>
                </div>
              </div>
              <div>{unSeen ? <p className="h-5 w-5 flex justify-center items-center bg-purple-500 rounded-full">{unSeen}</p> : <p></p>}</div>
            </div>
          );
        })}

      </div> : <div className="h-[78%] w-[85%] text-center pt-2 text-lg text-gray-300">No Users available</div>}
    </div>
  );
};

export default LeftSideBar;
