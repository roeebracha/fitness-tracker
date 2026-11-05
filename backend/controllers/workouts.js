const Workout = require("../models/Workout");
const{ syncGarminWorkouts} = require("../services/garminSync");

exports.getWorkouts = async (req, res) =>{
    const workouts = await Workout.find({user: req.user._id})
    .select("-raw")
    .sort({startTime: -1})
    .limit(Number(req.query.limit) || 50);

    res.json({workouts});
} ;

exports.syncGarmin = async (req, res) =>{
    try{
    const result = await Workout.find({user: req.user._id})
    req.json(result);
    } catch(error) {
        console.error("Garmin sync failed: ", error.message);
        res.status(502).json({error: "garmin sync failed"});
    }
};