import React, { useContext, useEffect, useState } from 'react'
import './SideBar.css'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import { Avatar, IconButton } from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import SearchIcon from '@material-ui/icons/Search';
import Contacts from './Contacts';
import { clientId } from '../../constants/data';
import { AccountContext } from '../context/AccountProvider';
import { getUsers } from '../../service/api';
import { UserContext } from '../context/UserProvider';
function SideBar() {

    //CONTEXT
    const {account,setAccount} = useContext(AccountContext)
    const {person,setPerson} = useContext(UserContext)

    //PROFILE URL
    const profileUrl = account.imageUrl

    //FREIND LIST 
    const [friend,setFriend]=useState([])

    //LOGOUT PROCESS
    const onLoginSuccess = () =>{
        setAccount(null)
        // setPerson(null)
        alert("You have logged out success")
        console.clear()
        
    }

    //GETTING ALL FRIENDS
    useEffect(() =>{
        const fetchData = async ()=>{
            const usersData = await getUsers()
            setFriend(usersData)
        }
        fetchData()
        
    },[])

    
    
  return (
    <div className='side'>
        <div className="side_header">
            <Avatar src={profileUrl} />
            <div className="side_hright">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    {/* <MoreVertIcon /> */}
                    <GoogleLogout 
                    buttonText='Logout'
                        clientId={clientId}
                        isSignedIn={true}
                        onLogoutSuccess={onLoginSuccess}
                    />
                </IconButton>
                
            </div>
        </div>
        <div className="side_search">
            <div className="search">
                <SearchIcon style={{verticalAlign:'middle'}}/>
                <input type="text" placeholder='Search or start new chat' spellCheck="false"/>
            </div>
        </div>
        <div className="side_user">
            {friend.map(user =>(
                user.googleId != account.googleId &&
                <Contacts key={user.googleId} userInfo={user}/> 
            ))}
            
        </div>
    </div>
  )
}

export default SideBar