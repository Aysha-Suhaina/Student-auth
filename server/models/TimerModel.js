import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true
  },
  mode: {
    type: String,
    enum: ["custom", "pomodoro_20_5", "pomodoro_40_10"],
    required: true
  },
  startTime: Date,
  endTime: Date,
  duration: Number,   
  actualDuration: Number,
  completed: {
    type: Boolean,
    default: false
  },
  cyclesCompleted: {
    type: Number,
    default: 0
  }
}, { timestamps: true });
const TimerModel = mongoose.models.timer || mongoose.model('timer',TimerSchema  )

export default TimerModel;