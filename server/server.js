import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";   

const app=express();

const port=process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    //origin:"http://localhost:3000",
    credentials:true
}));

app.get("/",(req,res)=>{
    res.send("api working fine");
})

app.listen(port ,()=>{
    console.log(`server is runnign on port ${port}`);
});

