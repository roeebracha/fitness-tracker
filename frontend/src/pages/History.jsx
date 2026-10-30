import { useState } from "react";
import { Link } from "react-router-dom";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Download,
  Plus,
  Search,
  PlusCircle,
  X,
  Settings2,
  Ellipsis,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { historyWorkouts } from "@/data/data";

const workoutTypeFilters = ["Run", "Strength", "Cycling"];

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Workout",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">
          {row.original.date} <span>{row.original.dow}</span>
        </span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground">
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "dur",
    header: () => <div className="text-right">Duration</div>,
    cell: ({ row }) => (
      <div className="text-right font-mono tabular-nums">{row.original.dur}</div>
    ),
  },
  {
    accessorKey: "dist",
    header: () => <div className="text-right">Distance</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">{row.original.dist}</div>
    ),
  },
  {
    accessorKey: "pace",
    header: () => <div className="text-right">Pace / speed</div>,
    cell: ({ row }) => (
      <div className="text-right text-muted-foreground tabular-nums">
        {row.original.pace}
      </div>
    ),
  },
  {
    accessorKey: "rpe",
    header: () => <div className="text-right">Effort</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.original.rpe}
        <span className="text-muted-foreground">/10</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Row actions">
                <Ellipsis />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableHiding: false,
  },
];

export default function History() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data: historyWorkouts,
    columns,
    state: { rowSelection, columnFilters, columnVisibility, pagination },
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const nameFilter = table.getColumn("name")?.getFilterValue() ?? "";
  const typeFilter = table.getColumn("type")?.getFilterValue() ?? [];
  const hasFilter = nameFilter !== "" || typeFilter.length > 0;

  const toggleTypeFilter = (type) => {
    const next = typeFilter.includes(type)
      ? typeFilter.filter((t) => t !== type)
      : [...typeFilter, type];
    table.getColumn("type")?.setFilterValue(next.length ? next : undefined);
  };

  const resetFilters = () => {
    table.getColumn("name")?.setFilterValue(undefined);
    table.getColumn("type")?.setFilterValue(undefined);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">History</h1>
          <p className="text-sm text-muted-foreground">Every workout you have logged.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download />
            Export CSV
          </Button>
          <Button nativeButton={false} render={<Link to="/workouts" />}>
            <Plus />
            New Workout
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-70 min-w-50">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filter workouts…"
            aria-label="Filter workouts"
            className="h-8 pl-8"
            value={nameFilter}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value || undefined)
            }
          />
        </div>

        {workoutTypeFilters.map((type) => {
          const active = typeFilter.includes(type);
          return (
            <Button
              key={type}
              variant="outline"
              size="sm"
              className="border-dashed"
              aria-pressed={active}
              onClick={() => toggleTypeFilter(type)}
            >
              <PlusCircle />
              {type}
              {active && (
                <>
                  <span className="mx-0.5 h-4 w-px bg-border" />
                  <Badge variant="secondary">Selected</Badge>
                </>
              )}
            </Button>
          );
        })}

        {hasFilter && (
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            Reset
            <X />
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="ml-auto">
                <Settings2 />
                View
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-2 text-sm">
        <p className="text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-medium">Rows per page</span>
            <Select
              value={String(pagination.pageSize)}
              onValueChange={(v) => table.setPageSize(Number(v))}
            >
              <SelectTrigger size="sm" className="w-18">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(table.getPageCount(), 1)}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="First page"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
            >
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Previous page"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Next page"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Last page"
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
