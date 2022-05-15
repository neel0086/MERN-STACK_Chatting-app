import { Avatar, IconButton } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodIcon from '@material-ui/icons/Mood';
import SendIcon from '@material-ui/icons/Send';
import GetAppIcon from '@material-ui/icons/GetApp';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import './Chat.css'
import { UserContext } from '../context/UserProvider';
import { getCoversation, getMessage, imagefile, newMessage, uploadFile } from '../../service/api';
import { AccountContext } from '../context/AccountProvider';
import { smily,hand,animal, family, sports, places } from './emojiArray';
function Chat() {

    //USECONTEXT TO SET USER
    const {person} = useContext(UserContext)
    const {account, socket, setActiveUsers, activeUsers,newMessageFlag, setNewMessageFlag } =useContext(AccountContext)
    
    //USESTATE
    const [converse,setConverse] = useState({})
    const [smile,setSmile] = useState(false)
    const [emoji,setEmoji] = useState(smily)
    const [value,setValue]=useState('')
    const [conversations,setConversations]=useState([])
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [newImage,setNewImage] = useState({})
    const [imageName,setImageName] = useState('')
    // const [imageURL,setImageURL] = useState('')
    

    useEffect(() => {
        
        socket.current.on('getMessage', data => {
            
            setIncomingMessage({
                sender: data.senderId,
                text: data.text,
                photo:data.photo,
                name:data.name,
                conversationId:data.conversationId,
                createdAt: Date.now()
            })
        })
    }, []);


    //when person is clicked on sidebar fetch the new persons converations
    useEffect(()  =>{ 
        const fetchConversation = async () =>{
            let data = await getCoversation({senderId:account.googleId,receiverId:person.googleId})
            setConverse(data)
            // console.log(data)
        }
        fetchConversation()
    },[person ?.googleId])

    

    useEffect(() =>{
        const getMessageDetails = async () =>{
            let data = await getMessage(converse._id)
            setConversations(data)
        }
        getMessageDetails();
    },[converse._id,newMessageFlag,converse?._id])

    //fetch conversations between users 
    useEffect(() => {
        incomingMessage && converse?.members?.includes(incomingMessage.sender) && 
            setConversations((prev) => [...prev, incomingMessage]);
        
        
    }, [incomingMessage, converse]);
    //SOCKET.IO CONNECTING USERS
    
    useEffect(()=>{
        socket.current.emit('addUser',account.googleId)
        socket.current.on('getUsers',users =>{
            // console.log(users)
            setActiveUsers(users)
        })
    },[setActiveUsers])

    const receiverId = converse?.members?.find(member => member !== account.googleId);
    //ON ENTER PRESS SEND TEXT TO MONGODB
    const sendText = async (e) =>{
        let code = e.keyCode || e.which
        console.log(e)
        if (code==13 || e.type=='click'){
            imagefile(newImage)
            let message={
                name:account.name,
                sender:account.googleId,
                conversationId:converse._id,
                text:value,
                photo:imageName
            }
            socket.current.emit('sendMessage', {
                name:account.name,
                senderId: account.googleId,
                receiverId,
                text: value,
                photo:imageName
            })
            
            await newMessage(message)
            
            setValue('')
            setImageName('')
            setNewMessageFlag(prev => !prev);
        }
    }
    const handlePhoto = async (e) =>{
        const formData = new FormData()
        const dateImg = Date.now()
        const val=e.target.files[0]
        const imgfile = new File([val], dateImg+val.name, {type: val.type});
        formData.append('photo',imgfile)
        formData.append('sender',account.googleId)
        formData.append('conversationId',converse._id)
        formData.append('text',value)
        formData.append('name',account.name)
        setNewImage(formData)
        setImageName(dateImg+val.name)
        
        
    }
    
    
  return (
    <>
        {!person ? 
        <div className='nothing'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Internet-group-chat.svg/768px-Internet-group-chat.svg.png"/>
            <p>Select to start chat</p>
        </div>
        
        : <div className='chat'>
        <div className="chat_header">
            <Avatar src={person.imageUrl}/>
            <div className="info">
                <h3>{person ? person.name : ''}</h3>
                <p>{activeUsers ?.find(user => user.googleId === person.googleId) ? 'online' :'offline'}</p>
            </div>
        
        
            <div className="side_hright">
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                
                
            </div>
        </div> 
        <div className="chatBody">
            {conversations && conversations.map((mssg) =>(
                
                <p className={mssg.sender!=account.googleId ? 'mssg' : 'mssg mssg_sender'}>
                    {!mssg.photo ?<>
                    {mssg.sender==account.googleId ?  <span className='name_tag'></span> : <span className="name_tag">  {/*mssg.name*/} </span>}
                    <p>{mssg.text}</p> </>
                    : <div className='imageandtext' ><a href={`http://localhost:8000//${mssg.photo}`} onClick='return false' className='downloadImg' target='blank' download><GetAppIcon /></a><img src={`http://localhost:8000//${mssg.photo}`} className="imagesend"/>
                    <span>{mssg.text}</span>
                    </ div>
                    }
                    <span className="time_tag">
                        {new Date().toDateString()}
                    </span>
                    
                </p>
                
            ))
            
            }
            
            

        </div>
        <div>
            <div className='footer'>
                <div style={{display:'flex',gap:'0.8rem',padding:'10px'}}>
                    <MoodIcon onClick={() => setSmile(!smile)} />
                    
                    <form  encType='multipart/form-data'>
                    <label for="im"><AttachFileIcon /></label>
                        
                        <input 
                            type="file" 
                            id='im'
                            name='myFile' 
                            onChange={handlePhoto}
                            style={{display:'none'}}
                        />
                        </form>
                    
                </div>
                <div className='form'>
                    <input
                        type="text" 
                        onKeyPress={(e) => sendText(e)}
                        placeholder='Type A message...' 
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        spellCheck="false"
                    />
                </div>              
                <IconButton>
                    <SendIcon onClick={(e)=>sendText(e)}/>
                </IconButton>
            </div>
            <div className="emoji-section" style={{display:smile ? 'block':'none'}}>
                <div className="emojibar">
                    <span onClick={()=>setEmoji(smily)}>😊</span>
                    <span onClick={()=>setEmoji(hand)}>🖐</span>
                    <span onClick={()=>setEmoji(animal)}>🐵</span>
                    <span onClick={()=>setEmoji(family)}>👨‍👨‍👦‍👦</span>
                    <span onClick={()=>setEmoji(sports)}>⚽️</span>
                    <span onClick={()=>setEmoji(places)}>🚗</span>
                </div>
                <div className="emoji">
                    {
                        emoji.map(e=><span onClick={()=>setValue(value+e)}>{e}</span>)
                    }
                </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default Chat