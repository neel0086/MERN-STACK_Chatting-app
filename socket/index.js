
//send and get mssg

import { Server } from 'socket.io';
import { socketData, socketDataGet } from './api.js';


const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    }, 
})


let users = []
const func = async () => {
    users = await socketDataGet()
    console.log(users)
}
// func()

// let users = [];

const addUser = (userId, socketId) => {
    
    !users.some(user => user.userId === userId) && users.push({ userId, socketId }) && socketData({userId, socketId});
    
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {

    return users.find(user => user.userId === userId);
}

io.on('connection',  (socket) => {
    console.log('user connected',socket.id)
    
    //connect
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    })
    //send message
    socket.on('sendMessage', ({ senderId, receiverId, text, name, photo}) => {
        
        const user = getUser(receiverId);
        
        io.to(user.socketId).emit('getMessage', {
            senderId, text, photo, name
        })
    })

    // disconnect
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //     removeUser(socket.id);
    //     io.emit('getUsers', users);
    // })
})