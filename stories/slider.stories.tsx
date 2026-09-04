import { SliderExample } from "./_examples.js"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Form/Slider",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An interactive control that lets users select a numeric value within a range.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <SliderExample />,
}
