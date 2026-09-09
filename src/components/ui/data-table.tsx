import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

export interface DataTableColumn<TData> {
  id: string
  header: React.ReactNode
  cell: (row: TData) => React.ReactNode
}

export interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[]
  data: TData[]
  getRowId?: (row: TData, index: number) => React.Key
  emptyMessage?: string
}

export function DataTable<TData>({
  columns,
  data,
  getRowId = (_, index) => index,
  emptyMessage = "No results.",
}: DataTableProps<TData>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.id}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length ? (
          data.map((row, index) => (
            <TableRow key={getRowId(row, index)}>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.cell(row)}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="h-24 text-center" colSpan={columns.length}>
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
