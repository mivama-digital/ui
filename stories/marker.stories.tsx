import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "../src/components/ui/marker.js"

const meta = {
  title: "Feedback/Marker",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Visual marker and indicator component.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Marker variant="default">
        <MarkerIcon>•</MarkerIcon>
        <MarkerContent>Active production deployment</MarkerContent>
      </Marker>
      <Marker variant="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
    </div>
  ),
}
