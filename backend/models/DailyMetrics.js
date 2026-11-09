const mongoose = require("mongoose");

const dailyMetricsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  activity: {
    steps: Number,
    totalCalories: Number,
    activeCalories: Number,
  },
  sleep: {
    score: Number,
    quality: String,
    totalSecondes: Number,
    deepSeconds: Number,
    lightSeconsd: Number,
    remSeconds: Number,
    awakeSeconds: Number,
  },

  heart: {
    restingHR: Number,
  },
  hrv: {
    lastNightAvg: Number,
    status: String,
    weeklyAvg: Number,
  },
},
{timestamps:true});

dailyMetricsSchema.index({ user: 1, date: 1}, {unique: true});

module.exports = mongoose.model("DailyMetrics", dailyMetricsSchema);
