import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  DirectionProvider,
  useDirection,
} from "../src/components/ui/direction.js"

function DirectionIndicator() {
  const direction = useDirection()
  return (
    <div className="rounded-md border p-4 text-sm">
      Current reading direction:{" "}
      <span className="font-semibold uppercase">{direction}</span>
    </div>
  )
}

const meta = {
  title: "Provider/Direction",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Applies reading direction (LTR/RTL) to child components.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DirectionProvider direction="ltr">
        <DirectionIndicator />
      </DirectionProvider>
      <DirectionProvider direction="rtl">
        <DirectionIndicator />
      </DirectionProvider>
    </div>
  ),
}
