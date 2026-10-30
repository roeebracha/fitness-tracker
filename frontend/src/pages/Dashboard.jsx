import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";

import { useAuth } from "../auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  kpis,
  trainingVolume,
  chartConfig,
  recentWorkouts,
  weeklyGoals,
} from "@/data/data";

export default function Dashboard() {
  const { user } = useAuth();
  const firstname = (user?.name || user?.username || "").split(" ")[0];
  const [range, setRange] = useState("12");

  const today = new Date().toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const data = range === "4" ? trainingVolume.slice(-4) : trainingVolume;

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <p className="text-sm text-muted-foreground" lang="he">
            {today}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Hey, {firstname}</h1>
        </div>
        <Button nativeButton={false} render={<Link to="/workouts" />}>
          <Plus />
          New Workout
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="min-w-55 flex-1">
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">
                {kpi.value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {kpi.trend === "up" ? <TrendingUp /> : <TrendingDown />}
                  {kpi.delta}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="flex items-center gap-2 font-medium">
                {kpi.headline}
                {kpi.trend === "up" ? (
                  <TrendingUp className="size-4" />
                ) : (
                  <TrendingDown className="size-4" />
                )}
              </div>
              <div className="text-muted-foreground">{kpi.sub}</div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training volume</CardTitle>
          <CardDescription>Weekly running distance · last 12 weeks</CardDescription>
          <CardAction>
            <Tabs value={range} onValueChange={setRange}>
              <TabsList>
                <TabsTrigger value="12">12 weeks</TabsTrigger>
                <TabsTrigger value="4">4 weeks</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-60 w-full">
            <AreaChart data={data} margin={{ left: 0, right: 0 }}>
              <defs>
                <linearGradient id="distanceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <ChartTooltip
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="distance"
                type="monotone"
                fill="url(#distanceFill)"
                stroke="var(--primary)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent workouts</CardTitle>
            <CardDescription>Your last five sessions</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm" nativeButton={false} render={<Link to="/history" />}>
                View all
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Workout</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Duration</TableHead>
                    <TableHead className="text-right">Distance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentWorkouts.map((w) => (
                    <TableRow key={w.date + w.name}>
                      <TableCell className="text-muted-foreground tabular-nums">
                        {w.date}
                      </TableCell>
                      <TableCell className="font-medium">{w.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-muted-foreground">
                          {w.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{w.dur}</TableCell>
                      <TableCell className="text-right tabular-nums">{w.dist}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly goals</CardTitle>
            <CardDescription>Oct 13 – Oct 19</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {weeklyGoals.map((goal) => (
              <div key={goal.label} className="grid gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{goal.label}</span>
                  <span className="text-muted-foreground tabular-nums">{goal.value}</span>
                </div>
                <Progress value={goal.pct} aria-label={goal.label} />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" nativeButton={false} render={<Link to="/insights" />}>
              See insights
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
