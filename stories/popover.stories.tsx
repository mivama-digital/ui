import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
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
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="text-sm">Width: 100%</div>
            <div className="text-sm">Height: 300px</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
