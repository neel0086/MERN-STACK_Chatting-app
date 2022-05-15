import Mssg from "../model/MssgSchema.js"



export const setTalks = async (req,res) =>{
    let senderId = req.body.senderId
    let receiverId = req.body.receiverId
    
    try{
        const exist = await Mssg.findOne({members:{$all:[receiverId,senderId]}})
        
        if (exist){
            res.status(200).json('new talk added success')
            return 
        }
        
        const newTalk =new Mssg({
            members:[senderId,receiverId]
        })
        await newTalk.save()
        res.status.json('new talk added success')
    }catch(error){
        res.status(500).json(error)
    }
}

export const getCoversation = async (req,res) =>{
    let senderId = req.body.senderId
    let receiverId = req.body.receiverId
    console.log(senderId,receiverId)
    try{
        let talk = await Mssg.findOne({members:{$all:[senderId,receiverId]}})
        
        res.status(200).json(talk)
    }catch(error){
        res.status(500).json(error)
    }
}

