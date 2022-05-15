import mongoose from "mongoose";
const Connection = async (username,password) =>{
    const URL=`mongodb+srv://${username}:${password}@mssgapp.xawsg.mongodb.net/ChatApp?retryWrites=true&w=majority`
    try{
    mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true})
    console.log("database connected succesfully")
    }catch(error){
        console.log("Error while connecting",error)
    }
}

export default Connection;