import type { Meta, StoryObj } from "@storybook/react-vite"
import { DatePicker } from "../src/components/ui/date-picker.js"

const meta = {
  title: "Form/DatePicker",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A date picker component rendering an interactive calendar.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-auto p-2">
      <DatePicker className="rounded-md border shadow-sm" />
    </div>
  ),
}
