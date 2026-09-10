import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../src/components/ui/button.js"
import { ButtonGroup } from "../src/components/ui/button-group.js"

const meta = {
  title: "Action/ButtonGroup",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Groups multiple buttons together with unified styling.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="ghost" size="sm">
        Left
      </Button>
      <Button variant="ghost" size="sm">
        Middle
      </Button>
      <Button variant="ghost" size="sm">
        Right
      </Button>
    </ButtonGroup>
  ),
}
