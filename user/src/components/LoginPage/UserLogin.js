import { useContext } from 'react'
import {GoogleLogin} from 'react-google-login'
import React from 'react'
import './UserLogin.css'
import { AccountContext } from '../context/AccountProvider'
import { addUser } from '../../service/api'
import { clientId } from '../../constants/data'

function UserLogin() {
  // const googleUrl = "https://e7.pngegg.com/pngimages/337/722/png-clipart-google-search-google-account-google-s-google-play-google-company-text.png"
  // const clientId= "296997160785-e502gepihli7c8s7o0r55ffaemjsu8kn.apps.googleusercontent.com"
  
  const {setAccount} = useContext(AccountContext)

  const onLoginSuccess = async (res) =>{
    setAccount(res.profileObj)
    await addUser(res.profileObj)
  }
  const onLoginFailure = (error) =>{
    console.log('login failure',error)
  }
  return (
    <div className='login_container'>
      <div className='google_login'>
        <p className='appName'>ChatPad</p>
      {/* <button className="button-33" role="button"><Avatar src={googleUrl} style={{width:'35px',height:'35px',marginRight:'10px'}}/> Google</button> */}
      <GoogleLogin 
      className='button-33'
      clientId={clientId}
      isSignedIn={true}
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
      />
      </div>

    </div>
  )
}

export default UserLogin