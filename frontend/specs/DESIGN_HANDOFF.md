# Fitness Tracker — Design Handoff (for Claude Code)

Source of truth for visuals: **shadcn/ui only** (new-york v4, base color `neutral`, CSS variables, Geist font, lucide icons).
The `.dc.html` files in `design/` are the visual reference. They use hand-written CSS classes that *mirror* shadcn components —
**do not copy their CSS**. Rebuild each screen with real shadcn components + Tailwind, matching layout, spacing, copy and hierarchy.

Project uses the **Base UI flavor of shadcn** (`@base-ui/react`): composition is via the `render` prop, not `asChild`
(e.g. `<Button render={<Link to="/workouts" />}>`). Always import from `@/components/ui/*`, never directly from `@base-ui/react`.

---

## 0. Setup

```bash
npx shadcn@latest add sidebar card badge button tabs table progress chart input textarea label \
  slider toggle-group checkbox select alert separator breadcrumb avatar scroll-area dropdown-menu tooltip
```

- Theme: keep shadcn's default `neutral` tokens in `index.css` (`:root` + `.dark`). No custom colors.
- Charts: shadcn `chart` (Recharts) using `var(--primary)` for single-series and `var(--chart-1..3)` for categories.
- Font: Geist (`@fontsource-variable/geist` or Google Fonts), numbers use `tabular-nums`.
- Sample data in the designs is placeholder — wire to real API/state.

## 1. Routes

| Path | File | Design reference |
|---|---|---|
| `/` (index) | `pages/Overview.jsx` | `design/Overview.dc.html` |
| `/workouts` | `pages/Workouts.jsx` | `design/Workouts.dc.html` |
| `/history` | `pages/History.jsx` | `design/History.dc.html` |
| `/stats` | `pages/Stats.jsx` | `design/Stats.dc.html` |
| `/insights` | `pages/Insights.jsx` | `design/Insights.dc.html` |
| `/coach` | `pages/Coach.jsx` (new) | `design/Main.dc.html` (AI Coach, ChatGPT-style) |
| `/login` | existing `Login.jsx` (unchanged, outside the layout) | — |

All routes except `/login` render inside `Dashboard.jsx` as the **layout** (`<Outlet />`), protected by `useAuth`.

## 2. App shell — `Dashboard.jsx` (layout)

Pattern: shadcn **sidebar-07 / dashboard-01**, `variant="inset"`.

```
<SidebarProvider>
  <AppSidebar variant="inset" />
  <SidebarInset>
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb> Section › Page </Breadcrumb>
      <div className="ml-auto"> theme toggle (ghost icon button, Moon) </div>
    </header>
    <div className="flex flex-1 flex-col gap-6 p-6"><Outlet /></div>
  </SidebarInset>
</SidebarProvider>
```

**AppSidebar**
- `SidebarHeader`: `SidebarMenuButton size="lg"` → logo tile `size-8 rounded-lg bg-primary text-primary-foreground` with `<Activity className="size-4" />`, text "Fitness Tracker" (font-semibold) / "Personal" (text-xs muted).
- `SidebarGroup` "Training": Overview (`LayoutDashboard`), Workouts (`Dumbbell`), History (`History`).
- `SidebarGroup` "Analytics": Stats (`ChartColumn`), Insights (`Lightbulb`), AI Coach (`Sparkles`).
- Active item: `isActive` from `useLocation()` (NavLink).
- `SidebarFooter`: NavUser — `Avatar rounded-lg size-8` (initials fallback), name + email (text-xs muted), `ChevronsUpDown`; opens `DropdownMenu` (Profile, Settings, Log out → `logout()`).

## 3. Overview (`/`)

1. **Page header** — `flex flex-wrap items-end justify-between gap-4`
   - Left: `<p className="text-sm text-muted-foreground">{today}</p>` + `<h1 className="text-2xl font-semibold tracking-tight">Hey, {firstname}</h1>`
     ⚠️ Fix current bug: it's `{firstname} ,Hey` → must be ``Hey, {firstname}``.
     ⚠️ Decide locale: date is `he-IL` inside an English UI — pick one (or i18n with `dir`).
   - Right: `<Button render={<Link to="/workouts" />}><Plus /> New Workout</Button>`
2. **KPI cards** — dashboard-01 `SectionCards`: `grid grid-cols-1 gap-4 @xl:grid-cols-2 @5xl:grid-cols-4`.
   Each `Card`: `CardHeader` → `CardDescription` (label), `CardTitle className="text-3xl font-semibold tabular-nums"` (value),
   `CardAction` → `<Badge variant="outline"><TrendingUp /> +12.5%</Badge>`; `CardFooter className="flex-col items-start gap-1.5 text-sm"` → bold trend line + muted sub-line.
   Cards: Running distance (7d) · Active time · Workouts · Resting heart rate (TrendingDown).
3. **Training volume** — `Card` with `CardAction` = `Tabs` (12 weeks / 4 weeks). `ChartContainer` + `AreaChart`, single series `distance`, stroke `var(--primary)`, gradient fill 0.22→0, no Y axis, X axis = week start labels, `ChartTooltip` with `ChartTooltipContent indicator="dot"`. Height `h-[240px]`.
4. **Bottom row** — `grid gap-4 lg:grid-cols-3`:
   - `lg:col-span-2` Card "Recent workouts" (CardAction: ghost sm Button "View all ›" → `/history`), `Table` in `rounded-lg border` wrapper, `TableHeader className="bg-muted"`. Columns: Date (muted) · Workout (font-medium) · Type (`Badge variant="outline" text-muted-foreground`) · Duration (right, tabular) · Distance (right).
   - Card "Weekly goals": 3 rows of label + `text-muted-foreground tabular-nums` value + `Progress`. Footer: outline sm full-width Button "See insights" → `/insights`.

## 4. Workouts (`/workouts`) — New workout form

- Header: h1 "New workout" + muted "Log a session, or start from a template."
- `grid gap-4 lg:grid-cols-3`:
  - `lg:col-span-2` **form Card** ("Workout details" / "Fields marked * are required."):
    - Type: `ToggleGroup variant="outline"` single: Run · Strength · Cycling · Swim · Other.
    - `grid gap-6 sm:grid-cols-2 xl:grid-cols-4`: Name*, Date* (date), Start time (time), Duration (min)*.
    - If type ≠ Strength: Distance (km), Avg heart rate, Elevation gain.
    - If type = Strength: "Exercises" Table with inline `Input`s (Exercise, Sets, Reps, Weight) + ghost icon `X` remove, header action outline sm "Add exercise".
    - Effort: `Label` + value "6 / 10 · Somewhat hard" (right) + `Slider min=1 max=10 step=1`.
    - Notes: `Textarea` + muted helper "Visible only to you."
    - `CardFooter className="justify-end gap-2 border-t"`: outline "Cancel" (→ `/`), primary "Save workout".
  - Right column: Card "Quick start" (list of ghost-style rows: muted icon tile `size-9 rounded-md bg-muted`, name + `text-xs` meta, `ChevronRight`; click pre-fills form) + Card "Last workout" (3 stat cells, outline sm "Repeat this workout").

## 5. History (`/history`)

shadcn **data-table** (TanStack Table) pattern:
- Header: h1 "History" + right: outline "Export CSV" + primary "New Workout".
- Toolbar: search `Input h-8 w-[280px]` with `Search` icon → filters by name; faceted filter buttons `variant="outline" size="sm" className="border-dashed"` with `PlusCircle` per type (Run / Strength / Cycling) showing a secondary badge when active; ghost "Reset ✕" when filtered; right-aligned outline sm "View" (`Settings2`) column toggle.
- Table columns: select `Checkbox` · Date (bold) + weekday (muted) · Workout · Type badge · Duration (mono) · Distance · Pace/speed (muted) · Effort `n/10` · row actions ghost icon `Ellipsis` → DropdownMenu (Edit, Duplicate, Delete).
- Empty: single row "No results." centered, `h-24`.
- Pagination footer: "0 of N row(s) selected." · "Rows per page" `Select` (10/20/50) · "Page X of Y" · 4 outline icon buttons (ChevronsLeft/Left/Right/ChevronsRight).

## 6. Stats (`/stats`)

- Header: h1 "Stats" + right: `Tabs` 7D / 30D / 90D / 1Y + outline "Export".
- KPI cards (same pattern as Overview): Total distance · Active time · Avg running pace · Workouts (footer: muted comparison line).
- Row `lg:grid-cols-3`:
  - `lg:col-span-2` "Minutes by activity": stacked `BarChart` (run=`--chart-1`, strength=`--chart-2`, cycling=`--chart-3`), `radius` on top segment, `ChartLegend` in CardAction.
  - "By activity": per type → color swatch, name, time (muted), % ; bar track `bg-muted h-2 rounded-full` with colored fill. Footer: Total.
- Row `lg:grid-cols-3`:
  - `lg:col-span-2` "Personal records" Table (Effort · Type · Time mono · Pace/speed · Date).
  - "Heart rate zones": single stacked horizontal bar (Z1–Z5 as `color-mix(primary 20/40/60/80/100%)`) + legend rows with %.

## 7. Insights (`/insights`)

- Header: h1 "Insights" + `Badge variant="outline"` with `Clock` "Updated today, 07:00".
- `Alert` (Info icon): "Based on the last 28 days" / description.
- `grid gap-4 md:grid-cols-2 xl:grid-cols-3` insight Cards: icon tile + title + muted category, `CardAction` badge (secondary / destructive), body text-sm, footer outline sm link Button. Warning card tile uses `bg-destructive/10 text-destructive`.
- Row `lg:grid-cols-2`:
  - "Goals": Progress rows separated by `Separator`, helper text-xs muted; achieved goal → `Badge` default with `Check`.
  - "Training load": big number `text-4xl font-semibold tabular-nums`, range bar (track `bg-muted`, optimal zone `bg-primary/25`, marker `w-1 h-4 bg-primary rounded`), scale labels, 3-column legend.

## 8. AI Coach (`/coach`) — ChatGPT-style

Layout inside `SidebarInset` (page must be full-height: `h-[calc(100svh-1rem)] overflow-hidden flex flex-col`):
- Header (replaces breadcrumb on this route): ghost button "AI Coach ▾" (`text-base font-semibold`, model/persona `DropdownMenu`), right: ghost sm "Share", ghost icon `SquarePen` (new chat).
- Body `flex flex-1 min-h-0`:
  - **History panel** `w-62 border-r p-2 hidden lg:flex flex-col` — ghost "New chat" (justify-start), search `Input h-8`, groups Today / Yesterday / Previous 7 days (`text-xs font-medium text-muted-foreground px-2 pt-4`), items `h-8 rounded-md px-2 text-sm truncate hover:bg-accent`, active `bg-accent font-medium`.
  - **Conversation** `flex-1 flex flex-col min-w-0`:
    - `ScrollArea flex-1` → thread `mx-auto max-w-3xl px-6 py-8 flex flex-col gap-8`.
    - User message: `self-end max-w-[75%] rounded-3xl bg-muted px-5 py-2.5 whitespace-pre-wrap`.
    - Assistant message: `flex gap-4` → avatar `size-7 rounded-full border` with `Sparkles size-3.5`; body `leading-7` markdown (lists, `code` = `font-mono text-sm bg-muted rounded px-1.5`, tables as bordered `rounded-lg` blocks). Action row (ghost icon sm, muted): Copy, ThumbsUp, ThumbsDown, RefreshCw, + ghost sm "Add to workouts".
    - Composer `px-6 pb-3`: `mx-auto max-w-3xl rounded-[28px] border border-input bg-background shadow-sm focus-within:border-ring p-3 pl-4.5 grid gap-1` → borderless auto-grow `textarea` (16px, placeholder "Ask about your training…"; Enter sends, Shift+Enter newline) + row: ghost icon round `Plus`, `Badge variant="outline" rounded-full` "Context: last 28 days", spacer, ghost icon round `Mic`, primary icon round `ArrowUp` (disabled when empty).
    - Disclaimer: `text-xs text-muted-foreground text-center mt-2` "AI Coach can make mistakes. It is not medical advice."
  - **Empty state** (new chat): centered `h1 text-[28px] font-semibold` "What are we training today?", composer, then suggestion chips (`rounded-full border h-9 px-3.5 text-sm` with Sparkles): Plan my week · Analyze my last run · Am I overtraining? · Build a 10K plan — click sends.
- Streaming: render assistant tokens incrementally; send the model a **precomputed training summary** (weekly volume, PRs, recent RPE), not the full workout history.

## 9. Global rules

- Dark mode via `.dark` on `<html>` (shadcn `ThemeProvider` pattern); every screen must work in both.
- Responsive: sidebar collapses to sheet on mobile (built-in); grids collapse to 1 column; wide tables in `overflow-x-auto` wrapper.
- Accessibility: real `<button>`/`<a>`, `aria-label` on icon-only buttons, `Label htmlFor` on every input.
- Fix in `Login.jsx`: `<Activity className="size-4" />` (currently overflows the `size-6` tile).
