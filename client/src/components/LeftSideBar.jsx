import React, { useContext, useEffect, useState } from "react";
import { userDummyData } from "../assets/assets";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/UserContext";

const LeftSideBar = ({ chatStatus, setChatStatus, setSelectedUser }) => {
  const { serverUrl } = useContext(DataContext);
  const [findingUser, setFindingUser] = useState("");
  const [foundUsers, setFoundUsers] = useState(userDummyData);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!foundUsers) {
      return;
    }
    const users = userDummyData.filter((e) => (e.fullName.toLowerCase().includes(findingUser.toLowerCase())));
    setFoundUsers(users);
  }, [findingUser]);

  const logOutHandler = () => {
    axios.post(`${serverUrl}/logout`,{},{withCredentials: true}).then((response) => {
      console.log(response.data.message);
    }).catch((error) => {
      console.log(error.response.data.message);
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
        <img src="./src/assets/logo.png" alt="logo" className="h-8" />
        <div className="relative">
          <img
            src="./src/assets/menu_icon.png"
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
      <div className="h-[7%] w-[90%] flex justify-around items-center bg-gray-800 rounded-3xl px-2">
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
          src="./src/assets/search_icon.png"
          alt="search icon"
          className="h-4"
        />
      </div>
      {foundUsers && foundUsers.length > 0 ? <div className="h-[78%] w-[85%] pt-4 no-scrollbar overflow-y-auto overflow-y-scroll">
        {foundUsers.map((e, i) => {
          return (
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer"
              key={i}
              onClick={() => {
                setChatStatus(true);
                setSelectedUser(e);
              }}
            >
              <img
                src={e.profilePic}
                alt="profile image"
                className="h-10 rounded-full"
              />
              <div>
                <h1>{e.fullName}</h1>
                <p className="text-gray-400 text-sm">Offline</p>
              </div>
            </div>
          );
        })}
        {foundUsers.map((e, i) => {
          return (
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer"
              key={i}
              onClick={() => {
                setChatStatus(true);
                setSelectedUser(e);
              }}
            >
              <img
                src={e.profilePic}
                alt="profile image"
                className="h-10 rounded-full"
              />
              <div>
                <h1>{e.fullName}</h1>
                <p className="text-gray-400 text-sm">Offline</p>
              </div>
            </div>
          );
        })}
      </div> : <div className="h-[78%] w-[85%] text-center pt-2 text-lg">No Users available</div>}
    </div>
  );
};

export default LeftSideBar;
