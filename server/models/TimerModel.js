import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
    startTime:{type:Date},//,required:true
    duration:{type:Number},//,required:true
    completed:{type:Boolean,default:false},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"student"}, //required:true
    progress:{type:Array,default:0},
}, { timestamps: true })

const TimerModel = mongoose.models.timer || mongoose.model('timer',TimerSchema  )

export default TimerModel;