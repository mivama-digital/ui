import type { Meta, StoryObj } from "@storybook/react-vite"

import { InputGroup } from "../src/components/ui/input-group.js"
import { Button } from "../src/components/ui/button.js"

const meta = {
  title: "Form/InputGroup",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compound input container for combining inputs with addons and actions.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-80">
      <InputGroup className="items-center px-3">
        <span className="text-sm text-muted-foreground">https://</span>
        <input
          className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
          placeholder="example.com"
        />
        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
          Copy
        </Button>
      </InputGroup>
    </div>
  ),
}
