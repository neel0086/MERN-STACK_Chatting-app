import React from 'react'

import SideBar from './SideBar';
import Chat from './Chat';
import './UserPage.css'
function UserPage() {
  
  return (
    <div className='user_page'>
    <div className='main_body'>
      <SideBar />
      <Chat />
    </div>
    </div>
  )
}

export default UserPage