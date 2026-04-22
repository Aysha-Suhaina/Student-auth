import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
    startTime:{type:Date,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"student",required:true},
    progress:{type:Array,default:0},
})