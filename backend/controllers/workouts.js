const Workout = require("../models/Workout");
const DailyMetrics = require("../models/DailyMetrics");
const { syncGarminWorkouts } = require("../services/garminSync");

exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id })
    .select("-raw")
    .sort({ startTime: -1 })
    .limit(Number(req.query.limit) || 50);

  res.json({ workouts });
};

exports.getDailyMetrics = async (req, res) => {
  const metrics = await DailyMetrics.find({ user: req.user._id })
    .sort({ date: -1 })
    .limit(Number(req.query.days) || 14);

  res.json({ metrics });
};

exports.syncGarmin = async (req, res) => {
  try {
    const result = await syncGarminWorkouts(req.user._id);
    res.json(result);
  } catch (error) {
    console.error("Garmin sync failed: ", error.message);
    res.status(502).json({ error: "garmin sync failed" });
  }
};
