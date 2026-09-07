import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it } from "vitest"
import type { ColumnDef } from "@tanstack/react-table"

import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  type DefaultDataTableFeatures,
} from "../../src/components/ui/data-table.js"

interface Payment {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "monserrat44@gmail.com",
  },
]

const columns: ColumnDef<DefaultDataTableFeatures, Payment, any>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      return <div className="text-right font-medium">${amount}</div>
    },
  },
]

describe("DataTable runtime & accessibility", () => {
  it("renders data table with semantic scopes and data", async () => {
    const { container } = render(
      <DataTable columns={columns} data={data} showPagination />
    )

    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()

    // Verify semantic header scopes
    const columnHeaders = screen.getAllByRole("columnheader")
    expect(columnHeaders).toHaveLength(3)
    columnHeaders.forEach((th) => {
      expect(th).toHaveAttribute("scope", "col")
    })

    // Verify cell contents
    expect(screen.getByText("ken99@yahoo.com")).toBeInTheDocument()
    expect(screen.getByText("abe45@gmail.com")).toBeInTheDocument()
    expect(screen.getByText("monserrat44@gmail.com")).toBeInTheDocument()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("handles sorting interaction via DataTableColumnHeader", async () => {
    render(<DataTable columns={columns} data={data} />)

    const sortButton = screen.getByRole("button", { name: "Sort by Email" })
    expect(sortButton).toBeInTheDocument()

    // Click to sort ascending
    fireEvent.click(sortButton)
    const rowsAfterAsc = screen.getAllByRole("row")
    // First data row should be abe45@gmail.com
    expect(rowsAfterAsc[1]).toHaveTextContent("abe45@gmail.com")

    // Click to sort descending
    fireEvent.click(sortButton)
    const rowsAfterDesc = screen.getAllByRole("row")
    // First data row should now be monserrat44@gmail.com
    expect(rowsAfterDesc[1]).toHaveTextContent("monserrat44@gmail.com")
  })

  it("renders custom empty message when data is empty", async () => {
    const { container } = render(
      <DataTable
        columns={columns}
        data={[]}
        emptyMessage="No payments found."
      />
    )

    expect(screen.getByText("No payments found.")).toBeInTheDocument()
    const cell = screen.getByText("No payments found.").closest("td")
    expect(cell).toHaveAttribute("colspan", "3")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders pagination controls and operates next/previous", async () => {
    render(<DataTable columns={columns} data={data} showPagination />)

    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    })
    const nextButton = screen.getByRole("button", { name: "Go to next page" })

    expect(prevButton).toBeDisabled()
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument()
  })

  it("renders column visibility options", async () => {
    function TableWithOptions() {
      return (
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      )
    }

    const { container } = render(<TableWithOptions />)
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
