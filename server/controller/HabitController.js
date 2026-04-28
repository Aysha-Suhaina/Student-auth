const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  try {
    const { habitName, type, userId } = req.body;

    const activeHabits = await Habit.countDocuments({
      userId,
      type
    });

    if (activeHabits >= 3) {
      return res.status(400).json({
        message: "Max 3 habits allowed"
      });
    }

    const habit = new Habit({
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

exports.logHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { completed } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const habit = await Habit.findById(habitId);

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

exports.getHabits = async (req, res) => {
  try {
    const { userId } = req.params;

    const habits = await Habit.find({ userId });

    res.json(habits);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};