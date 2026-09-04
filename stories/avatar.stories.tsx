import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from "../src/components/ui/avatar.js"

const meta = {
  title: "Feedback/Avatar",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An image element with a fallback for representing the user.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MS</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>+3</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </div>
  ),
}
