"use client"

import * as React from "react"
import {
  type Column,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type ReactTable,
  type RowSelectionState,
  type SortingState,
  type Table as TanStackTable,
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  flexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

import { cn } from "../../lib/utils.js"
import { Button, buttonVariants } from "./button.js"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu.js"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.js"

const defaultDataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns,
  filterFns,
})

type DefaultDataTableFeatures = typeof defaultDataTableFeatures

interface DataTableProps<
  TData extends Record<string, any> = Record<string, any>,
  TValue = unknown,
> {
  columns?: ColumnDef<DefaultDataTableFeatures, TData, TValue>[]
  data?: TData[]
  table?: ReactTable<DefaultDataTableFeatures, TData>
  className?: string
  emptyMessage?: React.ReactNode
  showPagination?: boolean
  state?: {
    sorting?: SortingState
    rowSelection?: RowSelectionState
    pagination?: PaginationState
  }
  onSortingChange?: OnChangeFn<SortingState>
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  onPaginationChange?: OnChangeFn<PaginationState>
}

function DataTable<
  TData extends Record<string, any> = Record<string, any>,
  TValue = unknown,
>({
  columns = [],
  data = [],
  table: externalTable,
  className,
  emptyMessage = "No results.",
  showPagination = false,
  state,
  onSortingChange,
  onRowSelectionChange,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const options = React.useMemo(() => {
    const opts: Record<string, any> = {
      features: defaultDataTableFeatures,
      columns: columns as ColumnDef<DefaultDataTableFeatures, TData, any>[],
      data,
    }
    if (state !== undefined) opts.state = state
    if (onSortingChange !== undefined) opts.onSortingChange = onSortingChange
    if (onRowSelectionChange !== undefined) {
      opts.onRowSelectionChange = onRowSelectionChange
    }
    if (onPaginationChange !== undefined) {
      opts.onPaginationChange = onPaginationChange
    }
    return opts
  }, [
    columns,
    data,
    state,
    onSortingChange,
    onRowSelectionChange,
    onPaginationChange,
  ])

  const internalTable = useTable(options as any)
  const table = externalTable ?? internalTable
  const colSpan = columns.length || table.getAllColumns().length || 1

  return (
    <div data-slot="data-table" className={cn("w-full space-y-4", className)}>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} scope="col">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header as any,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell as any,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colSpan}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && <DataTablePagination table={table as any} />}
    </div>
  )
}

interface DataTableColumnHeaderProps<
  TData extends Record<string, any> = Record<string, any>,
  TValue = unknown,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<DefaultDataTableFeatures, TData, TValue>
  title: string
}

function DataTableColumnHeader<
  TData extends Record<string, any> = Record<string, any>,
  TValue = unknown,
>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn("text-sm font-medium", className)}>{title}</div>
  }

  const sorted = column.getIsSorted()

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(sorted === "asc")}
        aria-label={`Sort by ${title}`}
      >
        <span>{title}</span>
        {sorted === "desc" ? (
          <ArrowDownIcon className="ml-2 size-4" />
        ) : sorted === "asc" ? (
          <ArrowUpIcon className="ml-2 size-4" />
        ) : (
          <ArrowUpDownIcon className="ml-2 size-4" />
        )}
      </Button>
    </div>
  )
}

interface DataTablePaginationProps<
  TData extends Record<string, any> = Record<string, any>,
> {
  table: ReactTable<DefaultDataTableFeatures, TData>
  className?: string
}

function DataTablePagination<
  TData extends Record<string, any> = Record<string, any>,
>({ table, className }: DataTablePaginationProps<TData>) {
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const totalCount = table.getFilteredRowModel().rows.length
  const pageIndex = table.state.pagination?.pageIndex ?? 0
  const pageCount = Math.max(1, table.getPageCount())

  return (
    <div
      data-slot="data-table-pagination"
      className={cn("flex items-center justify-between px-2 py-2", className)}
    >
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedCount} of {totalCount} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to previous page"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Go to next page"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DataTableViewOptionsProps<
  TData extends Record<string, any> = Record<string, any>,
> {
  table: ReactTable<DefaultDataTableFeatures, TData>
  className?: string
}

function DataTableViewOptions<
  TData extends Record<string, any> = Record<string, any>,
>({ table, className }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "ml-auto hidden h-8 lg:flex",
          className
        )}
        aria-label="Toggle column visibility"
      >
        <SlidersHorizontalIcon className="mr-2 size-4" />
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  defaultDataTableFeatures,
}
export type {
  DataTableColumnHeaderProps,
  DataTablePaginationProps,
  DataTableProps,
  DataTableViewOptionsProps,
  DefaultDataTableFeatures,
}
