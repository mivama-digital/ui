import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../src/components/ui/table.js"

const meta = {
  title: "Layout/Table",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A responsive table component for structured tabular data.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const invoices = [
  {
    invoice: "INV001",
    status: "Paid",
    amount: "$250.00",
    method: "Credit Card",
  },
  { invoice: "INV002", status: "Pending", amount: "$150.00", method: "PayPal" },
  {
    invoice: "INV003",
    status: "Unpaid",
    amount: "$350.00",
    method: "Bank Transfer",
  },
]

export const Basic: Story = {
  render: () => (
    <Table className="min-w-[400px]">
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.invoice}>
            <TableCell className="font-medium">{inv.invoice}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$750.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
