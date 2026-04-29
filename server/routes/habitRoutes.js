import express from "express";
const router = express.Router();
import {createHabit,logHabit,getHabits}  from "../controller/HabitController.js";

router.post("/create", createHabit);
router.post("/log/:habitId", logHabit);
router.get("/:userId", getHabits);

export default router;