import express from 'express'
import { getCoversation,  setTalks } from '../controller/Messg-controller.js';
import { getMessage, newMessage } from '../controller/Talk-controller.js';
import { addUser, getUsers, socketData, socketDataGet } from '../controller/user-controller.js';
// import upload from '../utils/uploads.js';
import path from 'path';
import multer from 'multer';
import Talk from '../model/TalkSchema.js';
// import { getImage, uploadImage } from '../image-controller.js';
const route = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        // console.log(file,0)
        cb(null, file.originalname);
    }
});


const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });

route.post('/uploadfile',upload.single('photo'), async (req, res) => {   
    console.log(req.file)
    try{
        // req.body.photo=req.file.filename
        // // console.log(req.body)
        // const newMssg = new Talk(req.body)
        // await newMssg.save()
        // res.status(500).json("Mssg and image saved success")
    }catch(error){
        // res.status(500).json('imageerror',error)
    }
});


//POST METHOD
route.post('/add',addUser)
route.post('/talk',setTalks)
route.post('/conversation/get',getCoversation)
route.post('/message/add',newMessage)
route.post(`/socketuser`,socketData)
// route.post('/uploadfile', upload.single('myfile'),imagefile);
//GET METHOD
route.get('/users',getUsers)
route.get('/message/get/:id',getMessage)
route.get(`/getsocket`,socketDataGet)
// route.get('/file/:filename', getImage);


export default route;