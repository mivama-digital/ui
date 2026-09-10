import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  DataTable,
  type DataTableColumn,
} from "../src/components/ui/data-table.js"

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
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
]

const columns: DataTableColumn<Payment>[] = [
  {
    id: "status",
    header: "Status",
    cell: (row) => <div className="capitalize">{row.status}</div>,
  },
  {
    id: "email",
    header: "Email",
    cell: (row) => <div className="lowercase">{row.email}</div>,
  },
  {
    id: "amount",
    header: "Amount",
    cell: (row) => <div className="font-medium">${row.amount}</div>,
  },
]

const meta = {
  title: "Layout/DataTable",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Generic data table component rendering typed columnar data.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-[650px]">
      <DataTable columns={columns} data={data} getRowId={(row) => row.id} />
    </div>
  ),
}
