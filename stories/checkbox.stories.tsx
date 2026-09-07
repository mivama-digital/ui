import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "../src/components/ui/checkbox.js"
import { Label } from "../src/components/ui/label.js"

const meta = {
  title: "Form/Checkbox",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Control that allows the user to toggle between checked and unchecked states.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}
