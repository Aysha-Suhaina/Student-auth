const express = require("express");
const router = express.Router();
const {
  createHabit,
  logHabit,
  getHabits
} = require("../controllers/habitController");

router.post("/create", createHabit);
router.post("/log/:habitId", logHabit);
router.get("/:userId", getHabits);

module.exports = router;