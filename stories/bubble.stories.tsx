import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../src/components/ui/bubble.js"

const meta = {
  title: "Feedback/Bubble",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Message bubble component with support for alignments and reactions.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <BubbleGroup className="w-80">
      <Bubble variant="default" align="start">
        <BubbleContent>Hello! How can I help you today?</BubbleContent>
        <BubbleReactions>👍 1</BubbleReactions>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>
          I have a question about the design system.
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}
