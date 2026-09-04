import { ScrollAreaExample } from "./_examples.js"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Layout/ScrollArea",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Custom cross-browser scrollable container with customized scrollbars.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <ScrollAreaExample />,
}
