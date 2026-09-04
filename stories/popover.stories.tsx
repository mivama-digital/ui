import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
} from "../src/components/ui/popover.js"
import { Button } from "../src/components/ui/button.js"

const meta = {
  title: "Overlay/Popover",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Floating popover content anchored to an interactive trigger.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline">Open Popover</Button>}
      />
      <PopoverContent>
        <PopoverTitle>Dimensions</PopoverTitle>
        <PopoverDescription>
          Set the dimensions for the layer.
        </PopoverDescription>
        <div className="grid gap-2 pt-2">
          <div className="text-sm">Width: 100%</div>
          <div className="text-sm">Height: 300px</div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
