import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const DataContext = createContext();

const UserContext = ({ children }) => {
    const serverUrl = "https://quick-chat-server-liart-tau.vercel.app/api";
    const socketUrl = "https://quick-chat-server-liart-tau.vercel.app";
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [requests, setRequests] = useState(null);
    const [unSeenCount, setUnSeenCount] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    const getUsersHandler = () => {
        axios.get(`${serverUrl}/get-users`, { withCredentials: true }).then((response) => {
            setUser(response.data.userWithOutPassword);
            setUsers(response.data.userWithOutPassword.users);
            setUnSeenCount(response.data.unSeenMessagesCount);
            setRequests(response.data.userWithOutPassword.requests);
            connectSocket(response.data.userWithOutPassword._id);
        }).catch((error) => {
            toast.error(error.response.data.message);
            navigate("/sign-up");
        })
    }

    const connectSocket = (userId) => {
        const newSocket = io(socketUrl, {
            query: { userId }
        });
        newSocket.on("online-users", (OnlineUsers) => {
            setOnlineUsers(OnlineUsers);
        });
        setSocket(newSocket);
    }

    useEffect(() => {
        getUsersHandler();
    }, []);

    const data = { serverUrl, user, users, unSeenCount, requests, onlineUsers, socket, setUser, setUsers, setRequests, getUsersHandler, setUnSeenCount };
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

export default UserContext
