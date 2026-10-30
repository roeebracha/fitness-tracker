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

export const insightCards = [
  {
    icon: "trending-up",
    tone: "default",
    title: "Volume is building",
    category: "Running distance",
    badge: { label: "Load", variant: "secondary" },
    body: "Your weekly running distance is up 18% over the last 4 weeks. Keep each week's increase around 10% or less to limit injury risk.",
    action: { label: "View in Stats", to: "/stats" },
  },
  {
    icon: "triangle-alert",
    tone: "destructive",
    title: "Hard days back to back",
    category: "Recovery",
    badge: { label: "Attention", variant: "destructive" },
    body: "Fri's tempo (RPE 8) was followed by Sat's strength session (RPE 7). Schedule an easy day before your next quality workout.",
    action: { label: "Review sessions", to: "/history" },
  },
  {
    icon: "flame",
    tone: "default",
    title: "6-week streak",
    category: "Consistency",
    badge: { label: "Habit", variant: "secondary" },
    body: "You have logged at least 4 workouts every week since Sep 7. One more week matches your longest streak.",
    action: { label: "Plan this week", to: "/workouts" },
  },
];

export const monthlyGoals = [
  {
    label: "Monthly distance",
    value: "104.6 / 180 km",
    pct: 58,
    helper: "On pace: 12 days left, about 6.3 km per day needed",
  },
  {
    label: "Strength sessions",
    value: "4 / 8",
    pct: 50,
    helper: "Behind: add 2 sessions per week to finish",
  },
];

export const achievedGoal = {
  label: "Sub-50 min 10K",
  sub: "PR 49:12 on Aug 30",
};

export const workoutTypes = ["Run", "Strength", "Cycling", "Swim", "Other"];

export const defaultExercises = [
  { name: "Bench press", sets: 4, reps: 8, kg: "60" },
  { name: "Pull-up", sets: 4, reps: 6, kg: "BW" },
  { name: "Overhead press", sets: 3, reps: 10, kg: "35" },
];

export const quickStartTemplates = [
  { name: "Easy run", meta: "Run · 45 min · RPE 4", type: "Run", rpe: 4 },
  { name: "Intervals 6×800 m", meta: "Run · 52 min · RPE 9", type: "Run", rpe: 9 },
  { name: "Upper body", meta: "Strength · 55 min · RPE 7", type: "Strength", rpe: 7 },
  { name: "Recovery spin", meta: "Cycling · 45 min · RPE 3", type: "Cycling", rpe: 3 },
];

export const lastWorkout = {
  name: "Long run",
  type: "Run",
  date: "Yesterday · Sun, Oct 18",
  stats: [
    { label: "Distance", value: "18.0 km" },
    { label: "Time", value: "1:42:10" },
    { label: "Pace", value: "5:41 /km" },
  ],
};

export const historyWorkouts = [
  { id: "1", date: "Oct 18", dow: "Sun", name: "Long run", type: "Run", dur: "1:42:10", dist: "18.0 km", pace: "5:41 /km", rpe: 6 },
  { id: "2", date: "Oct 17", dow: "Sat", name: "Upper body", type: "Strength", dur: "55:00", dist: "—", pace: "—", rpe: 7 },
  { id: "3", date: "Oct 16", dow: "Fri", name: "Tempo 6 km", type: "Run", dur: "38:24", dist: "8.2 km", pace: "4:41 /km", rpe: 8 },
  { id: "4", date: "Oct 15", dow: "Thu", name: "Recovery spin", type: "Cycling", dur: "45:00", dist: "16.5 km", pace: "22.0 km/h", rpe: 3 },
  { id: "5", date: "Oct 14", dow: "Wed", name: "Intervals 6×800 m", type: "Run", dur: "52:30", dist: "9.1 km", pace: "5:46 /km", rpe: 9 },
  { id: "6", date: "Oct 12", dow: "Mon", name: "Easy run", type: "Run", dur: "45:12", dist: "8.0 km", pace: "5:39 /km", rpe: 4 },
  { id: "7", date: "Oct 11", dow: "Sun", name: "Lower body", type: "Strength", dur: "1:00:00", dist: "—", pace: "—", rpe: 8 },
  { id: "8", date: "Oct 10", dow: "Sat", name: "Long run", type: "Run", dur: "1:35:40", dist: "16.5 km", pace: "5:48 /km", rpe: 6 },
  { id: "9", date: "Oct 9", dow: "Fri", name: "Easy run", type: "Run", dur: "40:05", dist: "7.0 km", pace: "5:44 /km", rpe: 4 },
  { id: "10", date: "Oct 8", dow: "Thu", name: "Hill repeats", type: "Run", dur: "50:18", dist: "8.4 km", pace: "5:59 /km", rpe: 8 },
];

export const statsKpis = [
  {
    label: "Total distance",
    value: "148.6 km",
    delta: "+9.2%",
    trend: "up",
    sub: "vs previous 30 days",
  },
  {
    label: "Active time",
    value: "26h 10m",
    delta: "+6.1%",
    trend: "up",
    sub: "vs previous 30 days",
  },
  {
    label: "Avg running pace",
    value: "5:32 /km",
    delta: "−8 s",
    trend: "down",
    sub: "Faster than previous 30 days",
  },
  {
    label: "Workouts",
    value: "21",
    delta: "+2",
    trend: "up",
    sub: "≈ 4.9 per week",
  },
];

export const activityChartConfig = {
  run: { label: "Run", color: "var(--chart-1)" },
  strength: { label: "Strength", color: "var(--chart-2)" },
  cycling: { label: "Cycling", color: "var(--chart-3)" },
};

export const weeklyActivityMinutes = [
  { week: "Aug 24", run: 180, strength: 60, cycling: 45 },
  { week: "Aug 31", run: 200, strength: 55, cycling: 60 },
  { week: "Sep 7", run: 170, strength: 60, cycling: 0 },
  { week: "Sep 14", run: 220, strength: 110, cycling: 45 },
  { week: "Sep 21", run: 240, strength: 55, cycling: 90 },
  { week: "Sep 28", run: 210, strength: 110, cycling: 60 },
  { week: "Oct 5", run: 260, strength: 60, cycling: 45 },
  { week: "Oct 12", run: 280, strength: 115, cycling: 45 },
];

export const activitySplit = [
  { name: "Run", time: "29h 20m", pct: 63, color: "var(--chart-1)" },
  { name: "Strength", time: "10h 25m", pct: 23, color: "var(--chart-2)" },
  { name: "Cycling", time: "6h 30m", pct: 14, color: "var(--chart-3)" },
];

export const activitySplitTotal = "46h 15m";

export const personalRecords = [
  { name: "5K", type: "Run", time: "23:41", pace: "4:44 /km", date: "Sep 21" },
  { name: "10K", type: "Run", time: "49:12", pace: "4:55 /km", date: "Aug 30" },
  { name: "Half marathon", type: "Run", time: "1:52:30", pace: "5:20 /km", date: "Oct 4" },
  { name: "Longest ride", type: "Cycling", time: "1:38:00", pace: "25.7 km/h", date: "Sep 13" },
];

export const heartRateZones = [
  { name: "Z1", desc: "Recovery", pct: 18, className: "bg-primary/20" },
  { name: "Z2", desc: "Endurance", pct: 42, className: "bg-primary/40" },
  { name: "Z3", desc: "Tempo", pct: 24, className: "bg-primary/60" },
  { name: "Z4", desc: "Threshold", pct: 12, className: "bg-primary/80" },
  { name: "Z5", desc: "VO₂ max", pct: 4, className: "bg-primary" },
];

export const trainingLoad = {
  ratio: 1.18,
  status: "Optimal",
  scale: { min: 0.5, max: 1.8 },
  optimal: { min: 0.8, max: 1.3 },
  zones: [
    { range: "Below 0.8", label: "Detraining" },
    { range: "0.8 – 1.3", label: "Sweet spot" },
    { range: "Above 1.3", label: "Injury risk" },
  ],
};

export const lastGarminSync = "12 min ago";

export const importedWorkouts = [
  {
    id: "g1",
    date: "Oct 18",
    dow: "Sun",
    name: "Long run",
    type: "Run",
    dur: "1:42:10",
    dist: "18.0 km",
    avgHr: "148 bpm",
    synced: "12 min ago",
    detail: {
      pace: "5:41 /km",
      elevation: "112 m",
      calories: "1,240 kcal",
      laps: [
        { lap: 1, dist: "5.0 km", time: "28:30", pace: "5:42 /km", avgHr: "142 bpm" },
        { lap: 2, dist: "5.0 km", time: "28:12", pace: "5:38 /km", avgHr: "147 bpm" },
        { lap: 3, dist: "5.0 km", time: "28:45", pace: "5:45 /km", avgHr: "151 bpm" },
        { lap: 4, dist: "3.0 km", time: "16:43", pace: "5:34 /km", avgHr: "153 bpm" },
      ],
      hrZones: [
        { name: "Z1", desc: "Recovery", pct: 8, className: "bg-primary/20" },
        { name: "Z2", desc: "Endurance", pct: 54, className: "bg-primary/40" },
        { name: "Z3", desc: "Tempo", pct: 30, className: "bg-primary/60" },
        { name: "Z4", desc: "Threshold", pct: 7, className: "bg-primary/80" },
        { name: "Z5", desc: "VO₂ max", pct: 1, className: "bg-primary" },
      ],
    },
  },
  {
    id: "g2",
    date: "Oct 16",
    dow: "Fri",
    name: "Tempo 6 km",
    type: "Run",
    dur: "38:24",
    dist: "8.2 km",
    avgHr: "162 bpm",
    synced: "2 days ago",
    detail: {
      pace: "4:41 /km",
      elevation: "34 m",
      calories: "620 kcal",
      laps: [
        { lap: 1, dist: "1.2 km", time: "6:40", pace: "5:33 /km", avgHr: "144 bpm" },
        { lap: 2, dist: "6.0 km", time: "27:36", pace: "4:36 /km", avgHr: "167 bpm" },
        { lap: 3, dist: "1.0 km", time: "4:08", pace: "4:08 /km", avgHr: "171 bpm" },
      ],
      hrZones: [
        { name: "Z1", desc: "Recovery", pct: 4, className: "bg-primary/20" },
        { name: "Z2", desc: "Endurance", pct: 12, className: "bg-primary/40" },
        { name: "Z3", desc: "Tempo", pct: 28, className: "bg-primary/60" },
        { name: "Z4", desc: "Threshold", pct: 44, className: "bg-primary/80" },
        { name: "Z5", desc: "VO₂ max", pct: 12, className: "bg-primary" },
      ],
    },
  },
  {
    id: "g3",
    date: "Oct 15",
    dow: "Thu",
    name: "Recovery spin",
    type: "Cycling",
    dur: "45:00",
    dist: "16.5 km",
    avgHr: "118 bpm",
    synced: "3 days ago",
    detail: {
      pace: "22.0 km/h",
      elevation: "68 m",
      calories: "410 kcal",
      laps: [
        { lap: 1, dist: "8.3 km", time: "22:30", pace: "22.1 km/h", avgHr: "116 bpm" },
        { lap: 2, dist: "8.2 km", time: "22:30", pace: "21.9 km/h", avgHr: "120 bpm" },
      ],
      hrZones: [
        { name: "Z1", desc: "Recovery", pct: 46, className: "bg-primary/20" },
        { name: "Z2", desc: "Endurance", pct: 42, className: "bg-primary/40" },
        { name: "Z3", desc: "Tempo", pct: 10, className: "bg-primary/60" },
        { name: "Z4", desc: "Threshold", pct: 2, className: "bg-primary/80" },
        { name: "Z5", desc: "VO₂ max", pct: 0, className: "bg-primary" },
      ],
    },
  },
  {
    id: "g4",
    date: "Oct 14",
    dow: "Wed",
    name: "Intervals 6×800 m",
    type: "Run",
    dur: "52:30",
    dist: "9.1 km",
    avgHr: "166 bpm",
    synced: "4 days ago",
    detail: {
      pace: "5:46 /km",
      elevation: "22 m",
      calories: "705 kcal",
      laps: [
        { lap: 1, dist: "0.8 km", time: "3:12", pace: "4:00 /km", avgHr: "172 bpm" },
        { lap: 2, dist: "0.4 km", time: "2:30", pace: "6:15 /km", avgHr: "150 bpm" },
        { lap: 3, dist: "0.8 km", time: "3:08", pace: "3:55 /km", avgHr: "175 bpm" },
        { lap: 4, dist: "0.4 km", time: "2:28", pace: "6:10 /km", avgHr: "149 bpm" },
        { lap: 5, dist: "0.8 km", time: "3:10", pace: "3:58 /km", avgHr: "177 bpm" },
        { lap: 6, dist: "0.4 km", time: "2:32", pace: "6:20 /km", avgHr: "148 bpm" },
      ],
      hrZones: [
        { name: "Z1", desc: "Recovery", pct: 2, className: "bg-primary/20" },
        { name: "Z2", desc: "Endurance", pct: 10, className: "bg-primary/40" },
        { name: "Z3", desc: "Tempo", pct: 18, className: "bg-primary/60" },
        { name: "Z4", desc: "Threshold", pct: 32, className: "bg-primary/80" },
        { name: "Z5", desc: "VO₂ max", pct: 38, className: "bg-primary" },
      ],
    },
  },
  {
    id: "g5",
    date: "Oct 12",
    dow: "Mon",
    name: "Easy run",
    type: "Run",
    dur: "45:12",
    dist: "8.0 km",
    avgHr: "138 bpm",
    synced: "6 days ago",
    detail: {
      pace: "5:39 /km",
      elevation: "41 m",
      calories: "560 kcal",
      laps: [
        { lap: 1, dist: "4.0 km", time: "22:30", pace: "5:38 /km", avgHr: "136 bpm" },
        { lap: 2, dist: "4.0 km", time: "22:42", pace: "5:40 /km", avgHr: "140 bpm" },
      ],
      hrZones: [
        { name: "Z1", desc: "Recovery", pct: 14, className: "bg-primary/20" },
        { name: "Z2", desc: "Endurance", pct: 70, className: "bg-primary/40" },
        { name: "Z3", desc: "Tempo", pct: 14, className: "bg-primary/60" },
        { name: "Z4", desc: "Threshold", pct: 2, className: "bg-primary/80" },
        { name: "Z5", desc: "VO₂ max", pct: 0, className: "bg-primary" },
      ],
    },
  },
];
