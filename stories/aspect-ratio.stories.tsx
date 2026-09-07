import type { Meta, StoryObj } from "@storybook/react-vite"

import { AspectRatio } from "../src/components/ui/aspect-ratio.js"

const meta = {
  title: "Layout/AspectRatio",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Displays content within a desired ratio.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio
        ratio={16 / 9}
        className="flex items-center justify-center rounded-md bg-muted"
      >
        <span className="text-sm text-muted-foreground">16:9 Ratio</span>
      </AspectRatio>
    </div>
  ),
}
