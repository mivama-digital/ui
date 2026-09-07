import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import { MivamaProvider } from "../../src/components/mivama-provider.js"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../src/components/ui/drawer.js"

function DrawerFixture({
  portal,
  swipeDirection = "down",
}: {
  portal?: HTMLElement
  swipeDirection?: "down" | "up" | "left" | "right"
}) {
  return (
    <MivamaProvider portalContainer={portal}>
      <Drawer swipeDirection={swipeDirection} showSwipeHandle>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <label htmlFor="name-input">Name</label>
            <input id="name-input" defaultValue="Jane Doe" />
          </div>
          <DrawerFooter>
            <DrawerClose>Cancel</DrawerClose>
            <button type="button">Save</button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </MivamaProvider>
  )
}

describe("Drawer primitive", () => {
  it("opens, focuses inside, supports Escape dismissal, and restores focus", async () => {
    const user = userEvent.setup()
    const { container } = render(<DrawerFixture />)

    const trigger = screen.getByRole("button", { name: "Open Drawer" })
    expect(screen.queryByRole("dialog")).toBeNull()

    await user.click(trigger)

    const dialog = await screen.findByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "Edit Profile" })
    ).toBeInTheDocument()
    expect(
      screen.getByText("Make changes to your profile here.")
    ).toBeInTheDocument()

    // Test a11y
    const results = await axe.run(container)
    expect(results.violations).toEqual([])

    // Escape closes drawer
    await user.keyboard("{Escape}")

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull()
    })
    expect(trigger).toHaveFocus()
  })

  it("closes when clicking close button", async () => {
    const user = userEvent.setup()
    render(<DrawerFixture />)

    await user.click(screen.getByRole("button", { name: "Open Drawer" }))
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toBeInTheDocument()

    const closeBtn = screen.getByRole("button", { name: "Cancel" })
    await user.click(closeBtn)

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).toBeNull()
    })
  })

  it("respects MivamaProvider portal container", async () => {
    const user = userEvent.setup()
    const portalTarget = document.createElement("div")
    portalTarget.id = "custom-drawer-portal"
    document.body.appendChild(portalTarget)

    try {
      render(<DrawerFixture portal={portalTarget} />)
      await user.click(screen.getByRole("button", { name: "Open Drawer" }))

      const dialog = await screen.findByRole("dialog")
      expect(portalTarget.contains(dialog)).toBe(true)
    } finally {
      portalTarget.remove()
    }
  })

  it("supports horizontal swipe direction", async () => {
    const user = userEvent.setup()
    render(<DrawerFixture swipeDirection="left" />)

    await user.click(screen.getByRole("button", { name: "Open Drawer" }))
    const dialog = await screen.findByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(dialog.getAttribute("data-swipe-axis")).toBe("x")
  })
})
