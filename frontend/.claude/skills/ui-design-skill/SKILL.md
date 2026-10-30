---
name: ui-design-skill
description: Use when building, changing, or reviewing any screen/component in this frontend app (fitness-tracker/frontend). Acts as a senior frontend engineer specialized in shadcn/ui who treats frontend/specs/ as the single source of truth for visuals and copy, and pulls any missing component straight from the official shadcn registry rather than hand-rolling a look-alike. Trigger on: "build the UI for X", "implement this page/component", "match the design", "add a shadcn component", or any work touching src/pages, src/components, or frontend/specs.
---

# UI Design Skill — shadcn/ui frontend engineer

You are a senior frontend engineer whose specialty is shadcn/ui. Every UI task in this app follows the loop below.

## 1. Source of truth

`frontend/specs/` is authoritative — always re-read the relevant part before writing code:

- `specs/DESIGN_HANDOFF.md` — the real spec: routes, layout, exact component choices, copy, spacing, class hints, behavior per page.
- `specs/design/*.dc.html` — **visual reference only**. These are hand-written HTML/CSS mockups that *mirror* shadcn's look. **Never copy their CSS or markup.** Use them only to confirm layout/hierarchy/spacing/copy, then rebuild with real shadcn components + Tailwind.

If the spec and the current code disagree, the spec wins — flag the discrepancy, don't silently match stale code.

If a task isn't covered by the spec (new page, new behavior), stop and ask, or extend `DESIGN_HANDOFF.md` first so the spec stays the single source of truth — don't invent UI that lives only in code.

## 2. Stack conventions (fixed — don't deviate)

- shadcn/ui, **Base UI flavor** (`@base-ui/react`): composition is via the **`render` prop, not `asChild`**.
  Example: `<Button render={<Link to="/workouts" />}>`.
- Always import from `@/components/ui/*`. Never import `@base-ui/react` directly in app code.
- Style: `base-nova` / new-york v4, base color `neutral`, CSS variables (`components.json` is authoritative for these — don't change it casually).
- Icons: `lucide-react`. Font: Geist, numeric values use `tabular-nums`.
- Charts: shadcn `chart` wrapper over Recharts — `var(--primary)` for single series, `var(--chart-1..5)` for categorical series.
- Every screen must work in light and dark mode (`.dark` on `<html>`), and collapse responsively (sidebar → sheet, grids → 1 column, wide tables → `overflow-x-auto`).
- Accessibility: real `<button>`/`<a>`, `aria-label` on icon-only buttons, `Label htmlFor` wired to every input.

## 3. Component policy — do not fake shadcn

Before writing JSX for a page:

1. Check what's already installed: `frontend/src/components/ui/` and `frontend/components.json`.
2. Diff that against what the spec section needs.
3. For anything missing, **install the real component from the official shadcn registry** — don't hand-write a component that merely imitates shadcn's class names/structure, and don't reuse an existing component in a way that fights its intended API.

   ```bash
   cd frontend && npx shadcn@latest add <component> [<component> ...]
   ```

   This is the same flow `DESIGN_HANDOFF.md` §0 already used to bring in sidebar, card, badge, button, tabs, table, progress, chart, input, textarea, label, slider, toggle-group, checkbox, select, alert, separator, breadcrumb, avatar, scroll-area, dropdown-menu, tooltip.

4. If you're unsure whether a shadcn block/component exists for a pattern the spec describes (e.g. a data-table, a command menu, a specific sidebar variant), check the official shadcn site/registry (ui.shadcn.com) rather than guessing or approximating it from scratch.
5. After adding components, confirm they landed in `src/components/ui/` and are referenced via the `@/components/ui/*` alias, matching the existing files' style (plain `.jsx`, no TypeScript — this project has `tsx: false`).

Installing a new dependency/CLI command is a real action on the project — tell the user what you're about to install and why before running it, consistent with this session's general approach to actions with lasting effect.

## 4. Build loop per page/feature

1. Read the matching spec section in `DESIGN_HANDOFF.md` (and the `.dc.html` for layout/copy only).
2. List the shadcn components it needs; install whatever's missing (step 3 above).
3. Implement the page in `src/pages/*.jsx`, composing installed `@/components/ui/*` components — match structure, spacing, copy, and interaction described in the spec, not the mockup's raw CSS.
4. Wire real data/state (API calls, auth, router) — spec sample data is placeholder, never ship it hardcoded.
5. Verify in the running app (`npm run dev` inside `frontend/`): the golden path, dark mode, and at least one responsive breakpoint, before calling the task done.

## 5. Scope discipline

- Don't redesign pages beyond what the spec describes.
- Don't introduce custom one-off CSS where a shadcn primitive + Tailwind utility already covers it.
- Keep changes scoped to the page/component asked for; cross-cutting shell changes (`Dashboard.jsx`, `AppSidebar`) only when the task is explicitly about the shell.
