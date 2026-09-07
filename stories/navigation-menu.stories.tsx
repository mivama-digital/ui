import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../src/components/ui/navigation-menu.js"

const meta = {
  title: "Navigation/NavigationMenu",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A collection of links for navigating websites including rich dropdown panels.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 md:w-[400px]">
            <div className="grid gap-2">
              <NavigationMenuLink
                href="/docs"
                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted"
              >
                <div className="text-sm font-medium leading-none">
                  Documentation
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Learn how to build components and accessible web applications.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/docs/installation"
                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted"
              >
                <div className="text-sm font-medium leading-none">
                  Installation
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  How to install dependencies and structure your app.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent className="p-4 md:w-[500px]">
            <div className="grid grid-cols-2 gap-2">
              <NavigationMenuLink
                href="/docs/primitives/alert"
                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted"
              >
                <div className="text-sm font-medium leading-none">Alert</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Displays a callout for user attention.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink
                href="/docs/primitives/button"
                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted"
              >
                <div className="text-sm font-medium leading-none">Button</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Interactive button with support for states.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-muted hover:text-foreground"
          >
            Documentation
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
