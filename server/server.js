import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";   
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import studentRouter from "./routes/studentRoutes.js";
import timerRouter from "./routes/timerRoutes.js";
import habitRouter from "./routes/habitRoutes.js";

const app=express();

const port=process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

//API endpoints 
app.use((req,res,next)=>{
    console.log("incoming request:", req.method, req.url);
    next();
})
app.use('/api/auth',authRouter)
app.use('/api/student',studentRouter)
app.use('/api/timer',timerRouter)
app.use('/api/habits',habitRouter);

app.listen(port ,()=>{
    console.log(`server is runnign on port ${port}`);
});

