import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "../src/components/ui/message-scroller.js"

const meta = {
  title: "Feedback/MessageScroller",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Scrolling container for chat threads with auto-scroll controls.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="h-64 w-80 rounded-md border">
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {Array.from({ length: 10 }, (_, i) => (
              <MessageScrollerItem key={i} className="p-2 border-b text-sm">
                Message #{i + 1}
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    </div>
  ),
}
