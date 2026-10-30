import { Link } from "react-router-dom";
import {
  Clock,
  Info,
  TrendingUp,
  TriangleAlert,
  Flame,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  insightCards,
  monthlyGoals,
  achievedGoal,
  trainingLoad,
} from "@/data/data";

const cardIcons = {
  "trending-up": TrendingUp,
  "triangle-alert": TriangleAlert,
  flame: Flame,
};

const month = new Date().toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

export default function Insights() {
  const { ratio, status, scale, optimal, zones } = trainingLoad;
  const scaleSpan = scale.max - scale.min;
  const zoneLeft = ((optimal.min - scale.min) / scaleSpan) * 100;
  const zoneWidth = ((optimal.max - optimal.min) / scaleSpan) * 100;
  const markerLeft = ((ratio - scale.min) / scaleSpan) * 100;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Insights</h1>
          <p className="text-sm text-muted-foreground">
            What your recent training is telling you.
          </p>
        </div>
        <Badge variant="outline">
          <Clock />
          Updated today, 07:00
        </Badge>
      </div>

      <Alert>
        <Info />
        <AlertTitle>Based on the last 28 days</AlertTitle>
        <AlertDescription>
          Insights are calculated from logged workouts only. Log heart rate and effort to make
          them more accurate.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {insightCards.map((card) => {
          const Icon = cardIcons[card.icon];
          return (
            <Card key={card.title}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div
                    className={
                      card.tone === "destructive"
                        ? "flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive"
                        : "flex size-9 shrink-0 items-center justify-center rounded-md bg-muted"
                    }
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.category}</CardDescription>
                  </div>
                </div>
                <CardAction>
                  <Badge variant={card.badge.variant}>{card.badge.label}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{card.body}</CardContent>
              <CardFooter className="mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  nativeButton={false}
                  render={<Link to={card.action.to} />}
                >
                  {card.action.label}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Goals</CardTitle>
            <CardDescription>{month}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {monthlyGoals.map((goal, i) => (
              <div key={goal.label} className="grid gap-2">
                {i > 0 && <Separator className="mb-3" />}
                <div className="flex justify-between gap-2 text-sm">
                  <span className="font-medium">{goal.label}</span>
                  <span className="text-muted-foreground tabular-nums">{goal.value}</span>
                </div>
                <Progress value={goal.pct} aria-label={goal.label} />
                <p className="text-xs text-muted-foreground">{goal.helper}</p>
              </div>
            ))}
            <Separator className="mb-1" />
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="grid gap-0.5">
                <span className="font-medium">{achievedGoal.label}</span>
                <span className="text-xs text-muted-foreground">{achievedGoal.sub}</span>
              </div>
              <Badge>
                <Check />
                Achieved
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training load</CardTitle>
            <CardDescription>Acute : chronic workload ratio</CardDescription>
            <CardAction>
              <Badge variant="outline">{status}</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold tabular-nums tracking-tight">{ratio}</span>
              <span className="text-sm text-muted-foreground">
                7-day load vs 28-day average
              </span>
            </div>
            <div className="grid gap-2">
              <div
                className="relative h-2 rounded-full bg-muted"
                role="img"
                aria-label={`Ratio ${ratio} on a scale from ${scale.min} to ${scale.max}; optimal range ${optimal.min} to ${optimal.max}`}
              >
                <span
                  className="absolute top-0 bottom-0 rounded-full bg-primary/25"
                  style={{ left: `${zoneLeft}%`, width: `${zoneWidth}%` }}
                />
                <span
                  className="absolute -top-1 h-4 w-1 -ml-0.5 rounded-sm bg-primary"
                  style={{ left: `${markerLeft}%` }}
                />
              </div>
              <div className="relative h-4 text-xs text-muted-foreground tabular-nums">
                <span className="absolute left-0">{scale.min}</span>
                <span
                  className="absolute -translate-x-1/2"
                  style={{ left: `${zoneLeft}%` }}
                >
                  {optimal.min}
                </span>
                <span
                  className="absolute -translate-x-1/2"
                  style={{ left: `${zoneLeft + zoneWidth}%` }}
                >
                  {optimal.max}
                </span>
                <span className="absolute right-0">{scale.max}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              {zones.map((zone) => (
                <div key={zone.label} className="grid gap-0.5">
                  <span className="text-xs text-muted-foreground">{zone.range}</span>
                  <span className="font-medium">{zone.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
