
import  express  from "express";
import  {config}  from "dotenv";
import mongoose from "mongoose";
import userRoute from './routes/user.js' 
import authRoute from './routes/auth.js' 
import videoRoute from './routes/video.js' 
import commentRoute from './routes/comment.js' 
import cookieParser from "cookie-parser"
const app=express();
app.use(express.json())
app.use(cookieParser())
config()
const connect=()=>{
    console.log("calling");
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    throw err;
})
}
app.use("/api/auth",authRoute) 
app.use("/api/users",userRoute) 
app.use("/api/videos",videoRoute) 
app.use("/api/comments",commentRoute) 

app.use((err,req,res,next)=>{
   const  status=err.status|| 500;
    const message=err.message|| "Something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})
app.listen(8080,()=>{
    connect()
    console.log("app running");
})