import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import router from "./routes/user.routes"
import blogRouter from "./routes/blog.routes"

dotenv.config()




const app = express();
app.use(express.json())
app.use("/api/v1/users",router);
app.use("/api/v1/blogs",blogRouter);
//mongoose.connect() returns a promise
mongoose.connect(process.env.MONGO_URL)
.then(()=>{app.listen(5000);})
.then(()=>{(console.log("Listening to the port 5000"))})
.catch((err)=>{(console.log(err))})
