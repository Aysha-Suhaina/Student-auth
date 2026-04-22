import mongoose from 'mongoose';

const SocialMediaModel = new mongoose.Schema({
    platform:{type:String,required:true},
    averageScreentime:{type:Number,required:true},
    improvedScreentime:{type:Number,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"student",required:true}
})