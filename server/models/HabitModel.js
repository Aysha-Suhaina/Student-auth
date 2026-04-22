import mongoose from 'mongoose';

const habitSchema= new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,},
    completed:{type:Boolean,default:false},
    frequency:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"student",required:true}
})