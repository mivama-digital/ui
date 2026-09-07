import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "../src/components/ui/label.js"
import { Input } from "../src/components/ui/input.js"

const meta = {
  title: "Form/Label",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Renders an accessible label associated with controls.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="grid w-80 gap-1.5">
      <Label htmlFor="email-input">Email address</Label>
      <Input id="email-input" type="email" placeholder="name@example.com" />
    </div>
  ),
}
