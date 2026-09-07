import type { Meta, StoryObj } from "@storybook/react-vite"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { Toggle } from "../src/components/ui/toggle.js"

const meta = {
  title: "Action/Toggle",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A two-state button that can be either on or off.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <BoldIcon className="size-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon className="size-4" />
      </Toggle>
      <Toggle variant="outline" size="sm" aria-label="Toggle underline">
        <UnderlineIcon className="size-4" />
      </Toggle>
    </div>
  ),
}
