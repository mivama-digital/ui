import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../src/components/ui/item.js"
import { Button } from "../src/components/ui/button.js"

const meta = {
  title: "Layout/Item",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "List or collection item container with media and content slots.",
      },
    },
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ItemGroup className="w-80">
      <Item variant="outline">
        <ItemMedia variant="icon">📄</ItemMedia>
        <ItemContent>
          <ItemTitle>Document</ItemTitle>
          <ItemDescription>Quarterly performance report</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="xs" variant="ghost">
            View
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemMedia variant="icon">📊</ItemMedia>
        <ItemContent>
          <ItemTitle>Analytics</ItemTitle>
          <ItemDescription>Usage trends</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}
