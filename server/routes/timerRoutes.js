import express from "express";
import timerController from "../controllers/timerController.js";

const router = express.Router();

router.post("/save", timerController.saveTimer);
router.get("/", timerController.getTimers);

export default router;