import type { Meta, StoryObj } from "@storybook/react-vite"

import { Kbd } from "../src/components/ui/kbd.js"

const meta = {
  title: "Feedback/Kbd",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Keyboard key indicator.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <span className="text-sm text-muted-foreground">
        to open command menu
      </span>
    </div>
  ),
}
