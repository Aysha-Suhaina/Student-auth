import HabitModel from "../models/HabitModel.js";

export const createHabit = async (req, res) => {
  try {
    const { habitName, type, userId } = req.body;

    const activeHabits = await HabitModel.countDocuments({
      userId,
      type
    });

    if (activeHabits >= 3) {
      return res.status(400).json({
        message: "Max 3 habits allowed"
      });
    }

    const habit = new HabitModel({
      habitName,
      type,
      userId
    });

    await habit.save();

    res.status(201).json(habit);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { completed } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const habit = await HabitModel.findById(habitId);

    const existingLog = habit.logs.find(
      log => log.date === today
    );

    if (existingLog) {
      existingLog.completed = completed;
    } else {
      habit.logs.push({
        date: today,
        completed
      });
    }

    await habit.save();

    res.json(habit);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHabits = async (req, res) => {
  try {
    const { userId } = req.params;

    const habits = await HabitModel.find({ userId });

    res.json(habits);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};