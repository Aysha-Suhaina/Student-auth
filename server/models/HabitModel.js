const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  }
});

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  habitName: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["good", "bad"],
    required: true
  },

  logs: [logSchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Habit", habitSchema);