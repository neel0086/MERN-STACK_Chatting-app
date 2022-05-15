import axios from 'axios'
const URL = `http://localhost:8000`

export const socketData = async (socketUser) =>{
    try{
        
    let res = await axios.post(`${URL}/socketuser`,socketUser)
    }
    catch(error){
        console.log("error while uploading socket Data")
    }
}

export const socketDataGet = async () =>{
    try{
    let res = await axios.get(`${URL}/getsocket`)
    return res.data
    }
    catch(error){
        console.log("error while uploading socket Data")
    }
}