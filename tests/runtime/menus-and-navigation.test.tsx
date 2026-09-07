import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import { MivamaProvider } from "../../src/components/mivama-provider.js"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../src/components/ui/hover-card.js"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../src/components/ui/context-menu.js"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../../src/components/ui/menubar.js"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../src/components/ui/navigation-menu.js"

describe("HoverCard runtime & accessibility", () => {
  it("renders trigger and displays content into portal container", async () => {
    const portal = document.createElement("div")
    portal.dataset.testid = "hover-portal"
    document.body.append(portal)

    render(
      <MivamaProvider portalContainer={portal}>
        <HoverCard defaultOpen>
          <HoverCardTrigger href="https://example.com">
            Hover Me
          </HoverCardTrigger>
          <HoverCardContent>
            <div>Preview details</div>
          </HoverCardContent>
        </HoverCard>
      </MivamaProvider>
    )

    const trigger = screen.getByRole("link", { name: "Hover Me" })
    expect(trigger).toBeInTheDocument()

    const content = await screen.findByText("Preview details")
    expect(content).toBeInTheDocument()
    expect(portal).toContainElement(content)

    portal.remove()
  })

  it("synchronizes shell theme attributes in provider-less mode", async () => {
    const shell = document.createElement("div")
    shell.setAttribute("data-mivama-theme", "editorial")
    shell.setAttribute("data-density", "compact")
    document.body.append(shell)

    const { unmount } = render(
      <HoverCard defaultOpen>
        <HoverCardTrigger href="https://example.com">Hover Me</HoverCardTrigger>
        <HoverCardContent>
          <div>Shell test</div>
        </HoverCardContent>
      </HoverCard>
    )

    const content = await screen.findByText("Shell test")
    const popup = content.closest("[data-slot=hover-card-content]")
    expect(popup).toBeInTheDocument()

    await waitFor(() => {
      expect(popup).toHaveAttribute("data-mivama-theme", "editorial")
      expect(popup).toHaveAttribute("data-density", "compact")
    })

    unmount()
    shell.remove()
  })
})

describe("ContextMenu runtime & accessibility", () => {
  it("opens on right click and respects items, submenus, and portal container", async () => {
    const portal = document.createElement("div")
    portal.dataset.testid = "context-portal"
    document.body.append(portal)

    render(
      <MivamaProvider portalContainer={portal}>
        <ContextMenu>
          <ContextMenuTrigger data-testid="target">
            Right click area
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Options</ContextMenuLabel>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuCheckboxItem checked>Show Grid</ContextMenuCheckboxItem>
            <ContextMenuRadioGroup value="first">
              <ContextMenuRadioItem value="first">First</ContextMenuRadioItem>
              <ContextMenuRadioItem value="second">Second</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
            <ContextMenuSeparator />
            <ContextMenuShortcut>Ctrl+C</ContextMenuShortcut>
          </ContextMenuContent>
        </ContextMenu>
      </MivamaProvider>
    )

    const trigger = screen.getByTestId("target")
    fireEvent.contextMenu(trigger)

    const menu = await screen.findByRole("menu")
    expect(menu).toBeInTheDocument()
    expect(portal).toContainElement(menu)

    expect(screen.getByText("Options")).toBeInTheDocument()
    expect(screen.getByText("Copy")).toBeInTheDocument()
    expect(
      screen.getByRole("menuitemcheckbox", { name: /Show Grid/ })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("menuitemradio", { name: "First" })
    ).toBeInTheDocument()

    const results = await axe.run(menu)
    expect(results.violations).toEqual([])

    portal.remove()
  })
})

describe("Menubar runtime & accessibility", () => {
  it("renders menubar, triggers menu and renders into portal container", async () => {
    const user = userEvent.setup()
    const portal = document.createElement("div")
    portal.dataset.testid = "menubar-portal"
    document.body.append(portal)

    render(
      <MivamaProvider portalContainer={portal}>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem variant="destructive">Exit</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </MivamaProvider>
    )

    const menubar = screen.getByRole("menubar")
    expect(menubar).toBeInTheDocument()

    const fileTrigger = screen.getByRole("menuitem", { name: "File" })
    await user.click(fileTrigger)

    const newWindowItem = await screen.findByRole("menuitem", {
      name: "New Window",
    })
    expect(newWindowItem).toBeInTheDocument()
    expect(portal).toContainElement(newWindowItem)

    portal.remove()
  })
})

describe("NavigationMenu runtime & accessibility", () => {
  it("renders navigation list, triggers content panel into portal container", async () => {
    const user = userEvent.setup()
    const portal = document.createElement("div")
    portal.dataset.testid = "nav-portal"
    document.body.append(portal)

    render(
      <MivamaProvider portalContainer={portal}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="/products/cloud">
                  Cloud Platform
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </MivamaProvider>
    )

    const nav = screen.getByRole("navigation")
    expect(nav).toBeInTheDocument()

    const trigger = screen.getByRole("button", { name: /Products/ })
    await user.click(trigger)

    const link = await screen.findByRole("link", { name: "Cloud Platform" })
    expect(link).toBeInTheDocument()
    expect(portal).toContainElement(link)

    portal.remove()
  })
})
