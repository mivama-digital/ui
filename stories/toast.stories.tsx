import type { Meta, StoryObj } from "@storybook/react-vite"
import { toast, ToastRootProvider } from "../src/components/ui/toast.js"
import { Button } from "../src/components/ui/button.js"

const meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Succinct message that is displayed temporarily for feedback.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ToastRootProvider>
      <div className="flex gap-2">
        <Button
          onClick={() =>
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2026 at 5:57 PM",
            })
          }
        >
          Default Toast
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            toast.error("Uh oh! Something went wrong.", {
              description: "There was a problem with your request.",
            })
          }
        >
          Destructive Toast
        </Button>
      </div>
    </ToastRootProvider>
  ),
}
