import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { DatePicker } from "../src/components/ui/date-picker.js"

const meta = {
  title: "Form/DatePicker",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A date picker component with an interactive calendar popover.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: function DatePickerStory() {
    const [date, setDate] = React.useState<Date | undefined>()

    return (
      <DatePicker
        date={date}
        onDateChange={setDate}
        placeholder="Select booking date"
      />
    )
  },
}
