import TimerModel from "../models/TimerModel.js";

export const saveTimer = async (req, res) => {
  try {
    const { category, startTime, endTime, duration, completed } = req.body;

    const timer = new TimerModel({
      category,
      startTime,
      endTime,
      duration,
      completed
    });
    console.log("Timer controller working")
    await timer.save();
    console.log("after saving")
    res.status(201).json({ message: "Timer saved", timer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTimers = async (req, res) => {
  try {
    const timer = await TimerModel.find().sort({ createdAt: -1 });
    res.json(timer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};