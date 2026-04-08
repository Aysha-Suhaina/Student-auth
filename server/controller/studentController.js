import StudentModel from "../models/StudentModel.js";

export const getStudentData= async(req,res)=>{
    try{
         const {studentId}= req.body;
         const student= await StudentModel.findById(studentId);
         if(!student){
            return res.json({success:false,msg:"student not found"});
         }

         res.json({success:true,
            userData:{
                name:student.name,
                email:student.email
            }
         })

    }catch(err){
        return res.json({success:false,msg:err.message})
    }
}