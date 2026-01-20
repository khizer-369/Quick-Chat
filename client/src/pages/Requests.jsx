import React, { useState } from 'react'
import { userDummyData } from '../assets/assets';

const Requests = () => {
    const [requestEmail, setRequestEmail] = useState("");

    const requestSubmitHandler = (e) => {
        e.preventDefault();
        setRequestEmail("");
    }
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='backdrop-blur-xl h-full w-full sm:h-130 sm:w-100 sm:rounded-lg sm:border-2 sm:border-gray-600'>
                <div className='h-[25%] flex flex-col justify-evenly items-center border-b-2 border-gray-500'>
                    <h1 className='w-[90%] text-2xl'>Send Request</h1>
                    <form className='w-[90%] flex justify-between items-center' onSubmit={(e) => {
                        requestSubmitHandler(e);
                    }}>
                        <input type="text" placeholder='Give email' value={requestEmail} className='bg-gray-800 h-10 w-[85%] rounded-lg pl-2 text-lg outline-none' required onChange={(e) => {
                            setRequestEmail(e.target.value);
                        }} />
                        <button className='cursor-pointer'>
                            <img src="./src/assets/send_button.svg" alt="send button" className='h-10' />
                        </button>
                    </form>
                </div>
                {userDummyData && userDummyData.length > 0 ? <div className='h-[75%] flex flex-col justify-between items-center'>
                    <div className='h-full w-[90%] no-scrollbar overflow-y-auto overflow-y-scroll'>
                        <h1 className='w-[90%] text-2xl pt-5 pb-5'>Requests</h1>
                        <div>
                            {userDummyData.map((e, i) => {
                                return (
                                    <div
                                        className="flex justify-between items-center gap-2 mb-2 pb-2"
                                        key={i}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <img
                                                src={e.profilePic}
                                                alt="profile image"
                                                className="h-10 rounded-full"
                                            />
                                            <h1>{e.fullName}</h1>
                                        </div>
                                        <div className='flex items-center'>
                                            <button className='h-9 w-18 bg-purple-500 cursor-pointer rounded'>Confirm</button>
                                            <p className='text-purple-500 pl-2 pr-2 cursor-pointer'>Cancel</p>
                                        </div>
                                    </div>
                                );
                            })}
                            {userDummyData.map((e, i) => {
                                return (
                                    <div
                                        className="flex justify-between items-center gap-2 mb-2 pb-2"
                                        key={i}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <img
                                                src={e.profilePic}
                                                alt="profile image"
                                                className="h-10 rounded-full"
                                            />
                                            <h1>{e.fullName}</h1>
                                        </div>
                                        <div className='flex items-center'>
                                            <button className='h-9 w-18 bg-purple-500 cursor-pointer rounded'>Confirm</button>
                                            <p className='text-purple-500 pl-2 pr-2 cursor-pointer'>Cancel</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div> : <div></div>}
            </div>
        </div>
    )
}

export default Requests
