import express from "express";
import {saveTimer,getTimers} from "../controller/TimerController.js";

const router = express.Router();

router.post("/save", saveTimer);
router.get("/", getTimers);

export default router;