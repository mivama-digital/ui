import type { Meta, StoryObj } from "@storybook/react-vite"

import { Item } from "../src/components/ui/item.js"

const meta = {
  title: "Layout/Item",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Interactive list or collection item container.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-80 space-y-1">
      <Item>
        <div className="flex w-full items-center justify-between">
          <span>Document</span>
          <span className="text-xs text-muted-foreground">PDF</span>
        </div>
      </Item>
      <Item>
        <div className="flex w-full items-center justify-between">
          <span>Analytics</span>
          <span className="text-xs text-muted-foreground">CSV</span>
        </div>
      </Item>
    </div>
  ),
}
