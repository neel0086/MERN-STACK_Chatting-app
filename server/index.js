import express  from "express";
import Connection from "./database/db.js";
import dotenv from 'dotenv'
import Routes from "./route/Route.js";
import cors from 'cors'
import path from 'path';
import bodyParser from 'body-parser' 

dotenv.config()
const app=express()
app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true }))
app.use(express.static("images"));  
app.get('/', function(req, res, next) {
    res.send("Hello world");
});
app.use('/',Routes)

const PORT = 8000

const username = process.env.MONGO_USERNAME
const password = process.env.MONGO_PASSWORD

Connection(username,password)
app.listen(PORT, () => console.log(`server started succesfully on ${PORT}`))
