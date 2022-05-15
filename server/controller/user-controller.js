import socketuser from "../model/SocketSchema.js"
import User from "../model/UserSchema.js"

export const addUser = async  (req,res) =>{
    try{
        let exist = await User.findOne({googleId:req.body.googleId})
        if(exist){
            
            res.status(200).json('user saved success')
            return 
        }
        const newUser = new User(req.body)
        await newUser.save();
        res.status(200).json('user saved success')
    }
    catch(error){
        res.status(500)
    }
    
}

export const getUsers = async (req,res) =>{
    try{
        const users = await User.find({})
        res.status(200).json(users)
    }catch(error){
        res.status(500).json(error)
    }
}

export const socketData = async (req,res) =>{
    try{
        const newSocket = new socketuser(req.body)
        console.log(newSocket)
        await newSocket.save()
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const socketDataGet = async (req,res) =>{
    try{
        const newSocket = await socketuser.find({})
        res.status(200).json(newSocket)
    }
    catch(error){
        res.status(500).json(error)
    }
}