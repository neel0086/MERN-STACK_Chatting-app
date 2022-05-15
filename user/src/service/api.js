import axios from 'axios'
const URL = `http://localhost:8000`
export const addUser = async (data) =>{
    try{
        return await axios.post(`${URL}/add`,data)
    }catch(error){
        console.log("error while calling")
    }
}

export const getUsers = async () =>{
    try{
        let res = await axios.get(`${URL}/users`)
        return res.data
    }catch(error){
        console.log("error while calling get user api")
    }
}

export const setTalks = async (data) =>{
    try{
        return await axios.post(`${URL}/talk`,data)
    }catch(error){
        console.log("error while calling get user api",error)
    }
}

export const getCoversation = async (data) =>{
    try{
        let res = await axios.post(`${URL}/conversation/get`,data)
        return res.data
    }catch(error){
        console.log("error while calling get converstion API")
    }
}

export const newMessage = async (data) =>{
    try{
        let res = await axios.post(`${URL}/message/add`,data)
        return res.data
    }catch(error){
        console.log("error while calling get converstion API")
    }
}

export const getMessage = async (id) =>{
    try{
        let res = await axios.get(`${URL}/message/get/${id}`)
        return res.data
    }catch(error){
        console.log("error while calling get mssg API")
    }
}
export const imagefile = async (formData) =>{
    try{
        let res =await axios.post(`${URL}/uploadfile`,formData)
        console.log(res)
    }
    catch(error){
        console.log("error while uplaoding the image")
    }
}




// export const uploadFile = async (post) => {
//     console.log(post);
//     try {
//         return await axios.post(`${URL}/file/upload`, post);
//     } catch (error) {
//         console.log('Error while calling uploadFile API ', error);
//     }
// }