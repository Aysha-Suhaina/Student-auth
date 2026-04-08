import express from 'express';
import  getStudentData from '../controller/studentController.js';
import studentAuth from '../middleware/studentAuth.js';


const studentRouter=express.Router();

studentRouter.get('/data',studentAuth, getStudentData);

export default studentRouter;