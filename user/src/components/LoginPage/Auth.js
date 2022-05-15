import React, { useContext } from 'react'
import { AccountContext } from '../context/AccountProvider'
import UserPage from '../MainPage/UserPage'
import UserLogin from './UserLogin'

function Auth() {
    const {account} =useContext(AccountContext) 
  return (
    <div>
        
        {account ? <UserPage /> : 
                     <UserLogin />}
    </div>
  )
}

export default Auth