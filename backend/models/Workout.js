const mongoose = require("mongoose");

const workoutScheme = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    source:{ type: String, default: "garmin"},
    garminActivityId:{type: String, required: true},

    name: String,
    type: String,
    startTime: Date,
    durationSeconds: Number,
    distanceMeters: Number,
    avgHeartRate: Number,
    maxHeartRate: Number,
    elevationGainMeters: Number,

    raw: Object,
},
{timstamps: true},
);

workoutScheme.index({ user: 1, garminActivityId: 1}, {unique: true});

module.exports = mongoose.model("Workout", workoutScheme);
