import mongoose from "mongoose";


const SocketSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    socketId:{
        type:String,
        required:true
    },
    
    // givenName:{
    //     type:String,
    //     required:true
    // },
    // familyName:{
    //     type:String,
    //     required:true
    // }

})

const socketuser = mongoose.model('scoketuser',SocketSchema)
export default socketuser