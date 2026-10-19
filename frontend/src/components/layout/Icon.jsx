import { BarChart2, Dumbbell, History, Home, TrendingUp } from "lucide-react";

const ICONS = {
  home: Home,
  insights: BarChart2,
  muscle: Dumbbell,
  history: History,
  stats: TrendingUp,
};

export default function Icon({ name, ...props }) {
  const Component = ICONS[name];
  return Component ? <Component {...props} /> : null;
}
