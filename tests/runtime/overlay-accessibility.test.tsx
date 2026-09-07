import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import { MivamaProvider } from "../../src/components/mivama-provider.js"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/ui/dialog.js"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../../src/components/ui/sheet.js"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../src/components/ui/tooltip.js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu.js"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/ui/popover.js"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../src/components/ui/alert-dialog.js"

function DialogFixture({ portal }: { portal?: HTMLElement }) {
  return (
    <MivamaProvider portalContainer={portal}>
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent closeLabel="Close settings">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure the application.</DialogDescription>
          <button type="button">Save</button>
        </DialogContent>
      </Dialog>
    </MivamaProvider>
  )
}

function SheetFixture() {
  return (
    <MivamaProvider>
      <Sheet>
        <SheetTrigger>Open sheet</SheetTrigger>
        <SheetContent side="left" size="md" closeLabel="Close navigation">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Choose a destination.</SheetDescription>
          <a href="#dashboard">Dashboard</a>
        </SheetContent>
      </Sheet>
    </MivamaProvider>
  )
}

describe("overlay components", () => {
  it("opens and closes a dialog, restores focus, and uses the provider portal", async () => {
    const user = userEvent.setup()
    const portal = document.createElement("div")
    portal.dataset.testid = "portal"
    document.body.append(portal)

    render(<DialogFixture portal={portal} />)

    const trigger = screen.getByRole("button", { name: "Open dialog" })
    await user.click(trigger)

    const dialog = await screen.findByRole("dialog", { name: "Settings" })
    expect(portal).toContainElement(dialog)
    expect(
      screen.getByRole("button", { name: "Close settings" })
    ).toBeInTheDocument()

    const results = await axe.run(dialog)
    expect(results.violations).toEqual([])

    await user.keyboard("{Escape}")
    await waitFor(() => expect(dialog).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()

    portal.remove()
  })

  it("exposes sheet side, size, accessible naming, and close behavior", async () => {
    const user = userEvent.setup()
    render(<SheetFixture />)

    const trigger = screen.getByRole("button", { name: "Open sheet" })
    await user.click(trigger)

    const sheet = await screen.findByRole("dialog", { name: "Navigation" })
    expect(sheet).toHaveAttribute("data-side", "left")
    expect(sheet).toHaveAttribute("data-size", "md")
    expect(
      screen.getByRole("button", { name: "Close navigation" })
    ).toBeInTheDocument()

    const results = await axe.run(sheet)
    expect(results.violations).toEqual([])

    await user.click(screen.getByRole("button", { name: "Close navigation" }))
    await waitFor(() => expect(sheet).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()
  })

  it("shows a tooltip for keyboard focus and dismisses it with Escape", async () => {
    const user = userEvent.setup()
    render(
      <MivamaProvider>
        <TooltipProvider delay={0}>
          <Tooltip>
            <TooltipTrigger>Help</TooltipTrigger>
            <TooltipContent>Helpful information</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </MivamaProvider>
    )

    const trigger = screen.getByRole("button", { name: "Help" })
    await user.tab()
    expect(trigger).toHaveFocus()

    const tooltip = await screen.findByRole("tooltip")
    expect(tooltip).toHaveTextContent("Helpful information")
    expect(trigger).toHaveAccessibleDescription("Helpful information")

    const results = await axe.run(tooltip)
    expect(results.violations).toEqual([])

    await user.keyboard("{Escape}")
    await waitFor(() => expect(tooltip).not.toBeInTheDocument())
  })

  it("renders DropdownMenu into provider portal and dismisses on Escape", async () => {
    const user = userEvent.setup()
    const portal = document.createElement("div")
    portal.dataset.testid = "portal"
    document.body.append(portal)

    render(
      <MivamaProvider portalContainer={portal}>
        <DropdownMenu>
          <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </MivamaProvider>
    )

    const trigger = screen.getByRole("button", { name: "Actions" })
    await user.click(trigger)

    const menu = await screen.findByRole("menu")
    expect(portal).toContainElement(menu)
    expect(screen.getByRole("menuitem", { name: "Item 1" })).toBeInTheDocument()

    await user.keyboard("{Escape}")
    await waitFor(() => expect(menu).not.toBeInTheDocument())
    portal.remove()
  })

  it("renders Popover into provider portal and dismisses on Escape", async () => {
    const user = userEvent.setup()
    const portal = document.createElement("div")
    portal.dataset.testid = "portal"
    document.body.append(portal)

    render(
      <MivamaProvider portalContainer={portal}>
        <Popover>
          <PopoverTrigger>Open details</PopoverTrigger>
          <PopoverContent>
            <div>Popover details</div>
          </PopoverContent>
        </Popover>
      </MivamaProvider>
    )

    const trigger = screen.getByRole("button", { name: "Open details" })
    await user.click(trigger)

    const content = await screen.findByText("Popover details")
    expect(portal).toContainElement(content)

    await user.keyboard("{Escape}")
    await waitFor(() => expect(content).not.toBeInTheDocument())
    portal.remove()
  })

  it("renders AlertDialog into provider portal and handles cancellation", async () => {
    const user = userEvent.setup()
    const portal = document.createElement("div")
    portal.dataset.testid = "portal"
    document.body.append(portal)

    render(
      <MivamaProvider portalContainer={portal}>
        <AlertDialog>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>Are you sure?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Dismiss</AlertDialogCancel>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </MivamaProvider>
    )

    const trigger = screen.getByRole("button", { name: "Delete" })
    await user.click(trigger)

    const dialog = await screen.findByRole("alertdialog")
    expect(portal).toContainElement(dialog)
    expect(screen.getByText("Confirm Deletion")).toBeVisible()

    const cancel = screen.getByRole("button", { name: "Dismiss" })
    await user.click(cancel)
    await waitFor(() => expect(dialog).not.toBeInTheDocument())
    expect(trigger).toHaveFocus()

    portal.remove()
  })
})
