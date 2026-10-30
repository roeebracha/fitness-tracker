export const kpis = [
  {
    label: "Running distance",
    value: "35.3 km",
    delta: "+12.5%",
    trend: "up",
    headline: "Trending up vs last week",
    sub: "Last 7 days · goal 40 km",
  },
  {
    label: "Active time",
    value: "4h 53m",
    delta: "+8.0%",
    trend: "up",
    headline: "Up 22 min vs last week",
    sub: "Across 5 sessions",
  },
  {
    label: "Workouts",
    value: "5",
    delta: "+1",
    trend: "up",
    headline: "One more than last week",
    sub: "3 runs · 1 strength · 1 ride",
  },
  {
    label: "Resting heart rate",
    value: "52 bpm",
    delta: "−2 bpm",
    trend: "down",
    headline: "Down over 30 days",
    sub: "Lower is better",
  },
];

export const trainingVolume = [
  { week: "Jul 27", distance: 28 },
  { week: "Aug 3", distance: 31 },
  { week: "Aug 10", distance: 25 },
  { week: "Aug 17", distance: 34 },
  { week: "Aug 24", distance: 37 },
  { week: "Aug 31", distance: 33 },
  { week: "Sep 7", distance: 40 },
  { week: "Sep 14", distance: 43 },
  { week: "Sep 21", distance: 36 },
  { week: "Sep 28", distance: 46 },
  { week: "Oct 5", distance: 48 },
  { week: "Oct 12", distance: 44 },
];

export const chartConfig = {
  distance: {
    label: "Distance",
    color: "var(--primary)",
  },
};

export const recentWorkouts = [
  { date: "Oct 18", name: "Long run", type: "Run", dur: "1:42:10", dist: "18.0 km" },
  { date: "Oct 17", name: "Upper body", type: "Strength", dur: "55:00", dist: "—" },
  { date: "Oct 16", name: "Tempo 6 km", type: "Run", dur: "38:24", dist: "8.2 km" },
  { date: "Oct 15", name: "Recovery spin", type: "Cycling", dur: "45:00", dist: "16.5 km" },
  { date: "Oct 14", name: "Intervals 6×800 m", type: "Run", dur: "52:30", dist: "9.1 km" },
];

export const weeklyGoals = [
  { label: "Running distance", value: "35.3 / 40 km", pct: 88 },
  { label: "Workouts", value: "5 / 6", pct: 83 },
  { label: "Strength sessions", value: "1 / 2", pct: 50 },
];
