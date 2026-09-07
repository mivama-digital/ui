import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../src/components/ui/hover-card.js"
import { Button } from "../src/components/ui/button.js"

const meta = {
  title: "Overlay/HoverCard",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "For sighted users to preview content available behind a link.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger
        render={
          <Button variant="link" className="p-0">
            @nextjs
          </Button>
        }
      />
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm text-muted-foreground">
            The React Framework – created and maintained by @vercel.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
