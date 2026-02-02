import React, { createContext } from 'react'

export const DataContext = createContext();

const UserContext = ({ children }) => {
    const serverUrl = "http://localhost:3000/api";
    const data = { serverUrl };
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}

export default UserContext
