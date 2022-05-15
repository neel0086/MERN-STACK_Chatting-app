import React, { createContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export const AccountContext = createContext("");
function AccountProvider({children}) {
    const [account,setAccount] = useState(null)
    const [activeUsers,setActiveUsers] = useState([])
    const socket = useRef()
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    // useEffect(()=>{
    //   console.log(activeUsers)
    // },[activeUsers])
    useEffect(() =>{
        socket.current = io('ws://localhost:9000')
      },[])
  return (
      <AccountContext.Provider value={{
        account,
        setAccount,
        socket,
        setActiveUsers,
        newMessageFlag,
        setNewMessageFlag
      }} >
      {children}
      </AccountContext.Provider>
  )
}

export default AccountProvider