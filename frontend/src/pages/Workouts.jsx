import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, X, ChevronRight, RefreshCw, Activity } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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
  workoutTypes,
  defaultExercises,
  quickStartTemplates,
  lastWorkout,
  importedWorkouts,
  lastGarminSync,
} from "@/data/data";

const rpeLabels = [
  "",
  "Very easy",
  "Easy",
  "Easy",
  "Moderate",
  "Moderate",
  "Somewhat hard",
  "Hard",
  "Very hard",
  "Very hard",
  "Max",
];

export default function Workouts() {
  const [activeTab, setActiveTab] = useState("imported");
  const [selected, setSelected] = useState(null);

  const [type, setType] = useState("Run");
  const [rpe, setRpe] = useState(6);
  const [exercises, setExercises] = useState(defaultExercises);

  const isStrength = type === "Strength";

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", kg: "" }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index, field, value) => {
    setExercises(
      exercises.map((ex, i) => (i === index ? { ...ex, [field]: value } : ex))
    );
  };

  const openDetail = (workout) => setSelected(workout);

  const handleRowKeyDown = (event, workout) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail(workout);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col gap-6 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Workouts</h1>
          <p className="text-sm text-muted-foreground">
            Review workouts synced from Garmin, or log one manually.
          </p>
        </div>
        <TabsList>
          <TabsTrigger value="imported">Imported</TabsTrigger>
          <TabsTrigger value="manual">Manual entry</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="imported" className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Imported workouts</CardTitle>
            <CardDescription>
              Synced automatically from Garmin Connect · Last synced {lastGarminSync}
            </CardDescription>
            <CardAction>
              <Button variant="outline" size="sm" type="button">
                <RefreshCw />
                Sync now
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted">
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Workout</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Duration</TableHead>
                    <TableHead className="text-right">Distance</TableHead>
                    <TableHead className="text-right">Avg HR</TableHead>
                    <TableHead className="text-muted-foreground">Synced</TableHead>
                    <TableHead className="w-9">
                      <span className="sr-only">View details</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importedWorkouts.map((w) => (
                    <TableRow
                      key={w.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${w.name} on ${w.date}`}
                      className="cursor-pointer hover:bg-accent/50 focus-visible:bg-accent/50 focus-visible:outline-none"
                      onClick={() => openDetail(w)}
                      onKeyDown={(e) => handleRowKeyDown(e, w)}
                    >
                      <TableCell className="text-muted-foreground">
                        <span className="text-foreground">{w.date}</span> · {w.dow}
                      </TableCell>
                      <TableCell className="font-medium">{w.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-muted-foreground">
                          {w.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{w.dur}</TableCell>
                      <TableCell className="text-right tabular-nums">{w.dist}</TableCell>
                      <TableCell className="text-right tabular-nums">{w.avgHr}</TableCell>
                      <TableCell className="text-muted-foreground">{w.synced}</TableCell>
                      <TableCell>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="manual">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Workout details</CardTitle>
              <CardDescription>Fields marked * are required.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label id="type-label">Type *</Label>
                <ToggleGroup
                  variant="outline"
                  value={[type]}
                  onValueChange={(v) => v[0] && setType(v[0])}
                  aria-labelledby="type-label"
                >
                  {workoutTypes.map((t) => (
                    <ToggleGroupItem key={t} value={t}>
                      {t}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <div className="grid gap-2">
                  <Label htmlFor="w-name">Name *</Label>
                  <Input id="w-name" type="text" placeholder="e.g. Tempo run" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="w-date">Date *</Label>
                  <Input id="w-date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="w-time">Start time</Label>
                  <Input id="w-time" type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="w-dur">Duration (min) *</Label>
                  <Input id="w-dur" type="number" min="1" placeholder="45" />
                </div>
              </div>

              {!isStrength && (
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="w-dist">Distance (km)</Label>
                    <Input id="w-dist" type="number" step="0.1" min="0" placeholder="8.0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="w-hr">Avg heart rate (bpm)</Label>
                    <Input id="w-hr" type="number" min="30" placeholder="145" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="w-elev">Elevation gain (m)</Label>
                    <Input id="w-elev" type="number" min="0" placeholder="120" />
                  </div>
                </div>
              )}

              {isStrength && (
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label>Exercises</Label>
                    <Button variant="outline" size="sm" type="button" onClick={addExercise}>
                      <Plus />
                      Add exercise
                    </Button>
                  </div>
                  <div className="rounded-lg border overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead>Exercise</TableHead>
                          <TableHead className="w-24">Sets</TableHead>
                          <TableHead className="w-24">Reps</TableHead>
                          <TableHead className="w-30">Weight (kg)</TableHead>
                          <TableHead className="w-11">
                            <span className="sr-only">Remove</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {exercises.map((ex, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <Input
                                className="h-8"
                                type="text"
                                aria-label="Exercise"
                                value={ex.name}
                                onChange={(e) => updateExercise(i, "name", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                className="h-8"
                                type="number"
                                aria-label="Sets"
                                value={ex.sets}
                                onChange={(e) => updateExercise(i, "sets", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                className="h-8"
                                type="number"
                                aria-label="Reps"
                                value={ex.reps}
                                onChange={(e) => updateExercise(i, "reps", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                className="h-8"
                                type="text"
                                aria-label="Weight in kg"
                                value={ex.kg}
                                onChange={(e) => updateExercise(i, "kg", e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                type="button"
                                aria-label="Remove exercise"
                                onClick={() => removeExercise(i)}
                              >
                                <X />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="w-rpe">Effort (RPE)</Label>
                  <span className="text-sm font-medium tabular-nums">
                    {rpe} <span className="font-normal text-muted-foreground">/ 10 · {rpeLabels[rpe]}</span>
                  </span>
                </div>
                <Slider
                  id="w-rpe"
                  min={1}
                  max={10}
                  step={1}
                  value={[rpe]}
                  onValueChange={(v) => setRpe(v[0])}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="w-notes">Notes</Label>
                <Textarea id="w-notes" placeholder="How did it feel? Route, weather, shoes…" />
                <p className="text-sm text-muted-foreground">Visible only to you.</p>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2 border-t">
              <Button variant="outline" nativeButton={false} render={<Link to="/" />}>
                Cancel
              </Button>
              <Button nativeButton={false} render={<Link to="/history" />}>
                Save workout
              </Button>
            </CardFooter>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick start</CardTitle>
                <CardDescription>Templates from your recent sessions</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-1">
                {quickStartTemplates.map((tp) => (
                  <button
                    key={tp.name}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-accent"
                    onClick={() => {
                      setType(tp.type);
                      setRpe(tp.rpe);
                    }}
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                      <Activity className="size-4" />
                    </span>
                    <span className="grid min-w-0 flex-1 gap-0.5">
                      <span className="text-sm font-medium">{tp.name}</span>
                      <span className="text-xs text-muted-foreground">{tp.meta}</span>
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Last workout</CardTitle>
                <CardDescription>{lastWorkout.date}</CardDescription>
                <CardAction>
                  <Badge variant="outline">{lastWorkout.type}</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm font-medium">{lastWorkout.name}</p>
                <div className="grid grid-cols-3 gap-3">
                  {lastWorkout.stats.map((stat) => (
                    <div key={stat.label} className="grid gap-0.5">
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                      <span className="font-semibold tabular-nums">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" type="button">
                  <RefreshCw />
                  Repeat this workout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </TabsContent>

      <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="gap-0 overflow-y-auto sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2">
                  <SheetTitle>{selected.name}</SheetTitle>
                  <Badge variant="outline">{selected.type}</Badge>
                </div>
                <SheetDescription>
                  {selected.date} · {selected.dow} · Imported from Garmin Connect · Synced{" "}
                  {selected.synced}
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-6 px-4 py-2">
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-0.5">
                    <span className="text-xs text-muted-foreground">Distance</span>
                    <span className="font-semibold tabular-nums">{selected.dist}</span>
                  </div>
                  <div className="grid gap-0.5">
                    <span className="text-xs text-muted-foreground">Duration</span>
                    <span className="font-semibold tabular-nums">{selected.dur}</span>
                  </div>
                  <div className="grid gap-0.5">
                    <span className="text-xs text-muted-foreground">Pace</span>
                    <span className="font-semibold tabular-nums">{selected.detail.pace}</span>
                  </div>
                  <div className="grid gap-0.5">
                    <span className="text-xs text-muted-foreground">Avg HR</span>
                    <span className="font-semibold tabular-nums">{selected.avgHr}</span>
                  </div>
                  <div className="grid gap-0.5">
                    <span className="text-xs text-muted-foreground">Elevation</span>
                    <span className="font-semibold tabular-nums">{selected.detail.elevation}</span>
                  </div>
                  <div className="grid gap-0.5">
                    <span className="text-xs text-muted-foreground">Calories</span>
                    <span className="font-semibold tabular-nums">{selected.detail.calories}</span>
                  </div>
                </div>

                <div className="grid gap-2">
                  <p className="text-sm font-medium">Laps</p>
                  <div className="rounded-lg border overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted">
                        <TableRow>
                          <TableHead>Lap</TableHead>
                          <TableHead>Distance</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Pace</TableHead>
                          <TableHead className="text-right">Avg HR</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selected.detail.laps.map((lap) => (
                          <TableRow key={lap.lap}>
                            <TableCell className="tabular-nums">{lap.lap}</TableCell>
                            <TableCell className="tabular-nums">{lap.dist}</TableCell>
                            <TableCell className="tabular-nums">{lap.time}</TableCell>
                            <TableCell className="tabular-nums">{lap.pace}</TableCell>
                            <TableCell className="text-right tabular-nums">{lap.avgHr}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="grid gap-2">
                  <p className="text-sm font-medium">Heart rate zones</p>
                  <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
                    {selected.detail.hrZones.map((zone) => (
                      <div
                        key={zone.name}
                        className={zone.className}
                        style={{ width: `${zone.pct}%` }}
                        title={`${zone.name} · ${zone.desc} · ${zone.pct}%`}
                      />
                    ))}
                  </div>
                  <div className="grid gap-1.5">
                    {selected.detail.hrZones.map((zone) => (
                      <div key={zone.name} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className={`size-2.5 rounded-full ${zone.className}`} />
                          {zone.name} <span className="text-muted-foreground">{zone.desc}</span>
                        </span>
                        <span className="tabular-nums text-muted-foreground">{zone.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter>
                <SheetClose render={<Button variant="outline" className="w-full" />}>
                  Close
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Tabs>
  );
}
