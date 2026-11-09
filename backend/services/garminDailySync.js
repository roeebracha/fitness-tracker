const DailyMetrics = require("../models/DailyMetrics");
const { callGarminTool } = require("./garminMcp");

// Every daily tool answers with the same shape:
//   { start_date, end_date, <array>: [ { date: "YYYY-MM-DD", ...fields } ] }
// so a source only has to pull out its list of days and map their fields.
// `map` returns the metric groups that source owns, so no two sources write
// the same group. One source may own more than one (sleep also carries
// resting HR).
const sources = [
  {
    tool: "get_stats_range",
    list: (data) => data.days.filter((d) => d.has_data),
    map: (d) => ({
      activity: {
        steps: d.steps,
        totalCalories: d.total_calories,
        activeCalories: d.active_calories,
      },
    }),
  },
  {
    tool: "get_sleep_summary_range",
    list: (data) => data.nights,
    // avg_overnight_hrv is deliberately unmapped: get_hrv_trend owns hrv.*
    map: (n) => ({
      sleep: {
        score: n.sleep_score,
        quality: n.sleep_score_qualifier,
        totalSeconds: n.sleep_seconds,
        deepSeconds: n.deep_sleep_seconds,
        lightSeconds: n.light_sleep_seconds,
        remSeconds: n.rem_sleep_seconds,
        awakeSeconds: n.awake_seconds,
      },
      heart: {
        restingHR: n.resting_heart_rate_bpm,
      },
    }),
  },
  {
    tool: "get_hrv_trend",
    list: (data) => data.hrv,
    map: (h) => ({
      hrv: {
        lastNightAvg: h.last_night_avg_hrv_ms,
        weeklyAvg: h.weekly_avg_hrv_ms,
        status: h.status,
      },
    }),
  },
];

// Pulls the last `days` days of health data and saves one DailyMetrics per day
async function syncDailyMetrics(userId, days = 14) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (days - 1));
  const range = {
    start_date: toDateString(start),
    end_date: toDateString(end),
  };

  // Call all tools in parallel. allSettled = one failing tool doesn't stop the others
  const results = await Promise.allSettled(
    sources.map((s) => callGarminTool(s.tool, range)),
  );

  // Merge everything by date: { "2026-11-01": { activity, sleep, heart, hrv } }
  const byDate = {};
  const errors = [];

  results.forEach((result, i) => {
    const source = sources[i];
    if (result.status === "rejected") {
      errors.push(`${source.tool}: ${result.reason.message}`);
      return;
    }
    for (const item of source.list(result.value)) {
      byDate[item.date] = { ...byDate[item.date], ...source.map(item) };
    }
  });

  const dates = Object.keys(byDate);
  if (dates.length > 0) {
    await DailyMetrics.bulkWrite(
      dates.map((date) => ({
        updateOne: {
          filter: { user: userId, date },
          update: { $set: byDate[date] },
          upsert: true,
        },
      })),
    );
  }

  return { days: dates.length, errors };
}

module.exports = { syncDailyMetrics };
