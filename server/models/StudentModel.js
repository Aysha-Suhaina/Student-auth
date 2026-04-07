import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {type: String , required:true },
    email: {type: String , required:true, unique:true },
    password: {type: String , required:true},
    verifyOtp: {type: String , default:''},
    verifyOtpExpireAt: {type: Number , default:0},
    isAccVerified :{type: Boolean , default: false},
    resetOtp :{type: String , default: ''},
    resetOtpExpireAt :{type: Number , default: 0}
})

const StudentModel = mongoose.models.student || mongoose.model('student', studentSchema )

export default StudentModel;