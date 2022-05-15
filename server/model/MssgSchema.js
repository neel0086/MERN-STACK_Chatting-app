import mongoose from "mongoose";


const mssgSchema = mongoose.Schema({
    members:{
        type:Array
    }},
    {
        timestamps:true
    }

)

const mssg =  mongoose.model('mssg',mssgSchema)
export default mssg