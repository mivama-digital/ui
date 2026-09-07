import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "../src/components/ui/button.js"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "../src/components/ui/button-group.js"

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
      <Button variant="outline">Left</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Middle</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
}
