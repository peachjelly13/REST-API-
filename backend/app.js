import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()



const app = express();
//mongoose.connect() returns a promise
mongoose.connect(process.env.MONGO_URL)
.then(()=>{app.listen(5000);})
.then(()=>{(console.log("Listening to the port 5000"))})
.catch((err)=>{(console.log(err))})
