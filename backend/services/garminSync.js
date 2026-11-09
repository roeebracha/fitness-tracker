const Workout = require("../models/Workout");
const {callGarminTool} = require("./garminMcp");

function toWorkout(activity, userId) {
  return {
    user: userId,
    garminActivityId: String(activity.id),
    type: activity.type,
    startTime: activity.start_time ? new Date(activity.start_time) : undefined,
    durationSeconds: activity.duration_seconds,
    distanceMeters: activity.distance_meters,
    calories: activity.calories,
    avgHeartRate: activity.avg_hr_bpm,
    maxHeartRate: activity.max_hr_bpm,
    elevationGainMeters: activity.elevation_gain_meters,
    raw: activity,
  };
}

async function syncGarminWorkouts(userId, maxActivities = 100){
    const activities = [];
    let start = 0;

    while (activities.length < maxActivities){
        const page = await callGarminTool("get_activities", {start, limit: 50});
        if(!page.activities) break;

        activities.push(...page.activities);
        if(!page.has_more) break;
        start = page.next_start;
    }

    if(activities.length === 0) return { fetched: 0, created: 0, updated:0};


    const result = await Workout.bulkWrite(
        activities.slice(0,maxActivities).map((activity) => {
           const workout =  toWorkout(activity, userId);

           return{
            updateOne:{
                filter:{user:userId, garminActivityId: workout.garminActivityId},
                update: {$set: workout},
                upsert: true,
            },
           }
        }), 
    );

    return{
        fetched: activities.length,
        created: result.upsertedCount,
        updated: result.modifiedCount,
    }
}

module.exports = { syncGarminWorkouts,toWorkout};