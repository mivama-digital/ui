import type { Meta, StoryObj } from "@storybook/react-vite"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../src/components/ui/toggle-group.js"

const meta = {
  title: "Action/ToggleGroup",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A set of two-state buttons that can be toggled on or off.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="default" defaultValue="italic">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}
