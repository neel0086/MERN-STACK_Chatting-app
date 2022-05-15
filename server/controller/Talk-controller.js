import Talk from "../model/TalkSchema.js"


export const newMessage = async (req,res) =>{
    try{    
        const newMssg = new Talk(req.body)
        await newMssg.save()
        res.status(200).json('Mssg saved success')
    }catch(error){
        res.status(500).json(error)
    }
}

export const getMessage = async (req,res) =>{
    try{    
        let mssg = await Talk.find({conversationId:req.params.id})
        res.status(200).json(mssg)
    }catch(error){
        res.status(500).json(error)
    }
}

export const imagefile = async (req,res) =>{
    try{
        console.log(req.file)
        res.send(req.file)
    }
    catch(error){
        res.status(500).json(error)
    }
}