import type { Meta, StoryObj } from "@storybook/react-vite"

import { Marker } from "../src/components/ui/marker.js"

const meta = {
  title: "Feedback/Marker",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Visual marker and inline indicator component.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="text-sm">
      Status: <Marker>Active</Marker> production deployment
    </div>
  ),
}
