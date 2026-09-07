import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Calendar } from "../src/components/ui/calendar.js"

const meta = {
  title: "Form/Calendar",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date field component that allows users to enter and edit dates.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: function CalendarStory() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
      />
    )
  },
}
