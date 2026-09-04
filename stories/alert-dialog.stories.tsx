import { AlertDialogExample } from "./_examples.js"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Overlay/AlertDialog",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal alert dialog for destructive actions requiring user confirmation.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <AlertDialogExample />,
}
