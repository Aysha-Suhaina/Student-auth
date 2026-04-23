import TimerModel from "../models/TimerModel";

export const saveTimer = async (req, res) => {
  try {
    const { category, startTime, endTime, duration, completed } = req.body;

    const timer = new Timer({
      category,
      startTime,
      endTime,
      duration,
      status
    });

    await timer.save();

    res.status(201).json({ message: "Timer saved", timer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTimers = async (req, res) => {
  try {
    const timers = await Timer.find().sort({ createdAt: -1 });
    res.json(timers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};