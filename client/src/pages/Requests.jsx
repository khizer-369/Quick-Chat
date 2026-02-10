import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../context/UserContext';
import axios from 'axios';

const Requests = () => {
    const { serverUrl, requests, setRequests } = useContext(DataContext);
    const [receiverEmail, setReceiverEmail] = useState("");

    const requestSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`${serverUrl}/send-request`, { receiverEmail }, { withCredentials: true }).then((response) => {
            console.log(response.data.message);
        }).catch((error) => {
            console.log(error.response.data.message);
        })
        setReceiverEmail("");
    }

    const requestAcceptHandler = (e) => {
        axios.post(`${serverUrl}/accept-request`, { senderId: e._id }, { withCredentials: true }).then((response) => {
            console.log(response.data.message);
            setRequests(prev => prev.map(item => item._id === e._id ? { ...item, requestStatus: true, requestStatusText: "Accepted" } : item));
        }).catch((error) => {
            console.log(error.response.data.message);
        })
    }

    const requestCancelHandler = (e) => {
        axios.post(`${serverUrl}/cancel-request`, { senderId: e._id }, { withCredentials: true }).then((response) => {
            console.log(response.data.message);
            setRequests(prev => prev.map(item => item._id === e._id ? { ...item, requestStatus: true, requestStatusText: "Cancelled" } : item));
        }).catch((error) => {
            console.log(error.response.data.message);
        })
    }
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='backdrop-blur-xl h-full w-full sm:h-130 sm:w-100 sm:rounded-lg sm:border-2 sm:border-gray-600'>
                <div className='h-[25%] flex flex-col justify-evenly items-center border-b-2 border-gray-500'>
                    <div className='w-[90%] flex gap-2'>
                        <NavLink to={"/"}>
                            <img src="./src/assets/arrow_icon.png" alt="arrow icon" className='h-8 cursor-pointer' />
                        </NavLink>
                        <h1 className='text-2xl'>Send Request</h1>
                    </div>
                    <form className='w-[90%] flex justify-between items-center' onSubmit={(e) => {
                        requestSubmitHandler(e);
                    }}>
                        <input type="text" placeholder='Give email' value={receiverEmail} className='bg-gray-800 h-10 w-[85%] rounded-lg pl-2 text-lg outline-none' required onChange={(e) => {
                            setReceiverEmail(e.target.value);
                        }} />
                        <button className='cursor-pointer'>
                            <img src="./src/assets/send_button.svg" alt="send button" className='h-10' />
                        </button>
                    </form>
                </div>
                {requests && requests.length > 0 ? <div className='h-[75%] flex flex-col justify-between items-center'>
                    <div className='h-full w-[90%] no-scrollbar overflow-y-auto overflow-y-scroll'>
                        <h1 className='w-[90%] text-2xl pt-5 pb-5'>Requests</h1>
                        <div>
                            {requests.map((e, i) => {
                                return (
                                    <div
                                        className="flex justify-between items-center gap-2 mb-2 pb-2"
                                        key={i}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <img
                                                src={e.profilePhotoUrl ? e.profilePhotoUrl : "./src/assets/avatar_icon.png"}
                                                alt="profile image"
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <h1 className='text-lg'>{e.userName}</h1>
                                        </div>
                                        {e.requestStatus ? <div className={e.requestStatusText === "Accepted" ? "text-purple-500 text-lg" : "text-red-500 text-lg"}>{e.requestStatusText}</div> : <div className='flex items-center'>
                                            <button className='h-9 w-18 bg-purple-500 cursor-pointer rounded' onClick={() => {
                                                requestAcceptHandler(e);
                                            }}>Confirm</button>
                                            <button className='text-purple-500 pl-2 pr-2 cursor-pointer' onClick={() => {
                                                requestCancelHandler(e);
                                            }}>Cancel</button>
                                        </div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div> : <div className='text-center pt-2 text-lg text-gray-300'>No Requests available</div>}
            </div>
        </div>
    )
}

export default Requests
