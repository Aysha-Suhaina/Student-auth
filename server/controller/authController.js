import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import StudentModel from '../models/StudentModel.js';
import transporter from '../config/nodemailer.js';

export const register = async(req,res)=>{
    const{name,email,password}=req.body;

    if(!name || !email || !password){
        return res.status(400).json({success:false , msg:"enter all the credentials"})
    }

    try{
        const existingStudent = await StudentModel.findOne({email})

        if(existingStudent){
            return res.json({success:false , msg:"mail already exist - please try with another mail "})
        }

        const hashedPassword= await bcrypt.hash(password,10);
        const student = new StudentModel({name,email,password:hashedPassword});

        await student.save();

        const token = jwt.sign({id: student._id}, process.env.JWT_SECRET,{expiresIn:'7d'});

        //welcome mil
        res.status(201).cookie('token', token, {
            httpOnly:true,
            //SECURE
            //sameSite
            maxAge:7*24*60*60*1000
        }).json({ success: true, msg: "Registered successfully" });

        const mailOptions ={
        from:process.env.SENDER_MAIL,
        to: email,
        subject:`Welcome to our platform ${name}`,
        text:`Thank you for registering with us ${name}  . Your accound has been created with the email id ${email}.
        We are excited to have you on board`
    }
    console.log("sending mail with options:", mailOptions);
        const info = await transporter.sendMail(mailOptions);

    }catch(err){
        return res.status(400).json({success:false,msg:err.message})
    }
}

export const login = async(req,res)=>{
    const {email,password}= req.body;

    if(!email || !password){
        return res.json({success:false, msg:"email and password are required "})
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
            secure:false,
            sameSite:"lax",
            maxAge:7*24*60*60*1000
        });
        return res.json({success:true,msg:`logged in successfully - welcome ${student.name}`,name:student.name});

//message

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

export const sendResetOtp = async (req,res)=>{
    const {email}= req.body;

    if(!email){
        return res.json({success:false,msg:"email required"})
    }
    try{
        const student = await StudentModel.findOne({email
        });

        if(!student){
            return res.json({success:false,msg:"email not found"})
        }

        const otp= String(Math.floor(100000 + Math.random() * 900000));

        student.resetOtp=otp;
        student.resetOtpExpiresAt= Date.now() + 10*60*1000;

        await student.save();
        console.log(" before sending mail ")
        const mailOptions ={
        from:process.env.SENDER_MAIL,
        to: email,
        subject:"Password Reset OTP",
        text:`your OTP for resetting your password is ${otp}. The OTP is valid for 10 minutes, 
        please use it to reset your password.`
        }

        await transporter.sendMail(mailOptions);
        console.log("mail sent:", mailOptions);
        return res.status(200).json({success:true,msg:"OTP sent to your email"})

    }catch(err){
        return res.status(400).json({success:false,msg:err.message})
    }
}

//reseting the password

export const resetPassword= async(req,res)=>{

    const {email,otp,newPassword}= req.body;

    if(!email || !otp || !newPassword){
        return res.status(400).json({success:false,msg:"enter all the credentials"})
    }
    try{
       const student=await StudentModel.findOne({email});

       if(!student){
        return res.status(400).json({success:false,msg:"email not found"})  

       }
       if(student.resetOtp !==otp || student.resetOtp=== "" || student.resetOtpExpiresAt < Date.now()){
        return res.status(400).json({success:false,msg:"invalid or expired OTP"})
       }

       const hashedPassword= await bcrypt.hash(newPassword,10);

       student.password=hashedPassword;
       student.resetOtp="";
       student.resetOtpExpiresAt=0;

       await student.save();

       return res.status(200).json({success:true,msg:"password reset successful"})
    }catch(err){
        return res.status(400).json({success:false,msg:err.message})
    };
    
}