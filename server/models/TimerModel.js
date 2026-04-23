import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
    startTime:{type:Date,required:true},
    Duration:{type:number,required:true},
    status:{type:Boolean,default:false},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"student",required:true},
    progress:{type:Array,default:0},
}, { timestamps: true })

const TimerModel = mongoose.models.timer || mongoose.model('timer',TimerSchema  )

export default TimerModel;