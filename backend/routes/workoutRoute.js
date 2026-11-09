const express = require("express");
const{guard} = require("../middleware/guard");
const {getWorkouts, syncGarmin, getDailyMetrics} = require ("../controllers/workouts");
const router = express.Router();

router.get("/", guard, getWorkouts);
router.get("/daily", guard, getDailyMetrics);
router.post("/sync/garmin", guard, syncGarmin);

module.exports = router;
