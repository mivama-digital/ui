import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../src/components/ui/input-group.js"

const meta = {
  title: "Form/InputGroup",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Compound input group with prefix and suffix addons.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-80">
      <InputGroup>
        <InputGroupAddon align="inline-start">https://</InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs" variant="outline">
            Copy
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
}
