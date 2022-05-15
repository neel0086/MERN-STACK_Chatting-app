import { Avatar } from '@material-ui/core'
import React, { useContext } from 'react'
import { setTalks } from '../../service/api'
import { AccountContext } from '../context/AccountProvider'
import { UserContext } from '../context/UserProvider'
import './Contact.css'
function Contacts({userInfo}) {

  //CONTEXT AUTH AND PERSON SELECT
  const {setPerson} =useContext(UserContext)
  const {account} =useContext(AccountContext)

  //PROFILE URL
  const url=userInfo.imageUrl
  

  const setUser = async () =>{
    setPerson(userInfo)
    await setTalks({senderId: account.googleId,receiverId:userInfo.googleId})
  }

  return (
    <div className='people' onClick={() =>setUser()}>
        <Avatar src={url}/>
        <div className='people_info'>
            <h3>{userInfo.name}</h3>
            <p>Hello buddy </p>
        </div>
    </div>
  )
}

export default Contacts