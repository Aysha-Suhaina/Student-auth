import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import StudentModel from '../models/StudentModel.js';

export const register = async(req,res)=>{
    const{name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({success:false , msg:"enter all the credentials"})
    }

    try{
        const existingStudent = await StudentModel.findOne({email})

        if(existingStudent){
            return res.status(400).json({success:false , msg:"mail already exist "})
        }

        const hashedPassword= await bcrypt.hash(password,10);
        const student = new StudentModel({name,email,password:hashedPassword});

        await student.save();

        const token = jwt.sign({id: student._id}, process.env.JWT_SECRET,{expiresIn:'7d'});

        res.status(201).cookie('token', token, {
            httpOnly:true,
            //SECURE
            //sameSite
            maxAge:7*24*60*60*1000
        }).json({ success: true, message: "Registered successfully" });;
        console.log("registered successfully");
    }catch(err){
        res.status(400).json({success:false,msg:err.message})
    }
}

export const login = async(req,res)=>{
    const {email,password}= req.body;

    if(!email || !password){
        res.json({success:false, message:"email and password are required "})
    }
    try{
        const student = await StudentModel.findOne({email})

        if(!student){
            return res.json({success:false,msg:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,student.password)

        if(!isMatch){
            return res.json({success:false,msg:"Invalid password"})
        };
        const token = jwt.sign({id: student._id}, process.env.JWT_SECRET,{expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly:true,
            //SECURE
            //sameSite
            maxAge:7*24*60*60*1000
        });
        return res.json({success:true,msg:`logged in successfully - welcome ${student.name}`})



    }catch(err){
        return res.json({success:false,msg:err.message})
    }
}

export const logout= async(req,res)=>{

    try{
        res.clearCookie('token', {httpOnly:true})

        return res.json({success:true,msg:"logged out"})
    }catch(err){
        return res.json({success:false,msg:err.message})
    }
}