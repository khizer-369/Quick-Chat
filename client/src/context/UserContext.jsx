import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const DataContext = createContext();

const UserContext = ({ children }) => {
    const serverUrl = "http://localhost:3000/api";
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [requests, setRequests] = useState(null);
    const [unSeenCount, setUnSeenCount] = useState(null);

    const navigate = useNavigate();

    const getUsersHandler = () => {
        axios.get(`${serverUrl}/get-users`, { withCredentials: true }).then((response) => {
            setUser(response.data.userWithOutPassword);
            setUsers(response.data.userWithOutPassword.users);
            setUnSeenCount(response.data.unSeenMessagesCount);
            setRequests(response.data.userWithOutPassword.requests);
        }).catch((error) => {
            console.log(error.response.data.message);
            navigate("/sign-up");
        })
    }
    useEffect(() => {
        getUsersHandler();
    }, []);

    const data = { serverUrl, user, users, unSeenCount, requests, setRequests, getUsersHandler };
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

export default UserContext
