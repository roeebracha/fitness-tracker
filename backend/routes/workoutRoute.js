const express = require("express");
const{guard} = require("../middleware/guard");
const {getWorkouts, syncGarmin} = require ("../controllers/workouts");
const router = express.Router();

router.get("/", guard, getWorkouts);
router.get("/sync/garmin", guard, syncGarmin);

module.exports = router;
