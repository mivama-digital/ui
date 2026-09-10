import type { Meta, StoryObj } from "@storybook/react-vite"

import { Bubble } from "../src/components/ui/bubble.js"

const meta = {
  title: "Feedback/Bubble",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Message bubble component with support for sent and received variants.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <Bubble variant="received">Hello! How can I help you today?</Bubble>
      <Bubble variant="sent">I have a question about the design system.</Bubble>
    </div>
  ),
}
