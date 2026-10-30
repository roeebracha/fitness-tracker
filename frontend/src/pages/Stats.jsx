import { useState } from "react";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Download, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  statsKpis,
  activityChartConfig,
  weeklyActivityMinutes,
  activitySplit,
  activitySplitTotal,
  personalRecords,
  heartRateZones,
} from "@/data/data";

export default function Stats() {
  const [period, setPeriod] = useState("30D");

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Stats</h1>
          <p className="text-sm text-muted-foreground">Your training at a glance.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="7D">7D</TabsTrigger>
              <TabsTrigger value="30D">30D</TabsTrigger>
              <TabsTrigger value="90D">90D</TabsTrigger>
              <TabsTrigger value="1Y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline">
            <Download />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statsKpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <CardTitle className="text-3xl font-semibold tabular-nums">{kpi.value}</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {kpi.trend === "up" ? <TrendingUp /> : <TrendingDown />}
                  {kpi.delta}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">{kpi.sub}</CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Minutes by activity</CardTitle>
            <CardDescription>Weekly totals · last 8 weeks</CardDescription>
            <CardAction>
              <div className="flex flex-wrap gap-3 text-xs">
                {Object.entries(activityChartConfig).map(([key, cfg]) => (
                  <span key={key} className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 shrink-0 rounded-sm"
                      style={{ background: cfg.color }}
                    />
                    {cfg.label}
                  </span>
                ))}
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ChartContainer config={activityChartConfig} className="h-60 w-full">
              <BarChart data={weeklyActivityMinutes} margin={{ left: 0, right: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="run" stackId="activity" fill="var(--color-run)" />
                <Bar dataKey="strength" stackId="activity" fill="var(--color-strength)" />
                <Bar
                  dataKey="cycling"
                  stackId="activity"
                  fill="var(--color-cycling)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>By activity</CardTitle>
            <CardDescription>Share of time · last 8 weeks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {activitySplit.map((s) => (
              <div key={s.name} className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className="size-2.5 shrink-0 rounded-sm"
                    style={{ background: s.color }}
                  />
                  <span className="font-medium">{s.name}</span>
                  <span className="ml-auto text-muted-foreground tabular-nums">{s.time}</span>
                  <span className="w-10 text-right font-medium tabular-nums">{s.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${s.pct}%`, background: s.color }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="mt-auto justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium tabular-nums">{activitySplitTotal}</span>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal records</CardTitle>
            <CardDescription>Best efforts across all logged workouts</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm" nativeButton={false} render={<Link to="/history" />}>
                History
                <ChevronRight />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead>Effort</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                    <TableHead className="text-right">Pace / speed</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personalRecords.map((r) => (
                    <TableRow key={r.name}>
                      <TableCell className="font-medium">{r.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-muted-foreground">
                          {r.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{r.time}</TableCell>
                      <TableCell className="text-right tabular-nums">{r.pace}</TableCell>
                      <TableCell className="text-right text-muted-foreground tabular-nums">
                        {r.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Heart rate zones</CardTitle>
            <CardDescription>Time in zone · last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div
              className="flex h-3 gap-0.5 overflow-hidden rounded-full"
              role="img"
              aria-label={heartRateZones
                .map((z) => `${z.name} ${z.pct}%`)
                .join(", ")}
            >
              {heartRateZones.map((z) => (
                <span
                  key={z.name}
                  className={`${z.className} h-full rounded-full`}
                  style={{ width: `${z.pct}%` }}
                />
              ))}
            </div>
            <div className="grid gap-2.5">
              {heartRateZones.map((z) => (
                <div key={z.name} className="flex items-center gap-2 text-sm">
                  <span className={`size-2.5 shrink-0 rounded-sm ${z.className}`} />
                  <span className="font-medium">{z.name}</span>
                  <span className="text-muted-foreground">{z.desc}</span>
                  <span className="ml-auto font-medium tabular-nums">{z.pct}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
