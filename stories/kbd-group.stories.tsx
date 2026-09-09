import type { Meta, StoryObj } from "@storybook/react-vite"

import { Kbd } from "../src/components/ui/kbd.js"
import { KbdGroup } from "../src/components/ui/kbd-group.js"

const meta = {
  title: "Feedback/Kbd Group",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Groups related keyboard key indicators.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}
