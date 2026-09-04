import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

import { MivamaProvider } from "../../src/components/mivama-provider.js"
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
import { Slider } from "../../src/components/ui/slider.js"
import { ScrollArea } from "../../src/components/ui/scroll-area.js"

describe("new core primitives", () => {
  describe("AlertDialog", () => {
    it("opens, displays confirmation details, and dismisses on cancel without a11y violations", async () => {
      const user = userEvent.setup()
      const portal = document.createElement("div")
      document.body.append(portal)

      const { container } = render(
        <MivamaProvider portalContainer={portal}>
          <AlertDialog>
            <AlertDialogTrigger>Delete account</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </MivamaProvider>
      )

      const trigger = screen.getByRole("button", { name: "Delete account" })
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByRole("alertdialog")).toBeInTheDocument()
      })

      expect(screen.getByText("Are you sure?")).toBeVisible()
      expect(
        screen.getByText("This will permanently delete your account.")
      ).toBeVisible()

      const results = await axe.run(portal)
      expect(results.violations).toEqual([])

      const cancelBtn = screen.getByRole("button", { name: "Cancel" })
      await user.click(cancelBtn)

      await waitFor(() => {
        expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
      })

      portal.remove()
    })
  })

  describe("Slider", () => {
    it("renders slider with thumb, track, and indicator without a11y violations", async () => {
      const { container } = render(
        <div className="w-64">
          <label id="slider-label" htmlFor="volume-slider">
            Volume
          </label>
          <Slider
            id="volume-slider"
            defaultValue={40}
            min={0}
            max={100}
            aria-labelledby="slider-label"
          />
        </div>
      )

      const slider = container.querySelector('[data-slot="slider"]')
      expect(slider).toBeInTheDocument()
      expect(
        container.querySelector('[data-slot="slider-track"]')
      ).toBeInTheDocument()
      expect(
        container.querySelector('[data-slot="slider-thumb"]')
      ).toBeInTheDocument()

      const results = await axe.run(container)
      expect(results.violations).toEqual([])
    })
  })

  describe("ScrollArea", () => {
    beforeAll(() => {
      Element.prototype.getAnimations = () => []
    })

    afterAll(() => {
      delete (Element.prototype as unknown as { getAnimations?: unknown })
        .getAnimations
    })

    it("renders scroll area with viewport and custom scrollbar", async () => {
      const { container } = render(
        <ScrollArea className="h-40 w-48 border">
          <div>
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </div>
        </ScrollArea>
      )

      const scrollArea = container.querySelector('[data-slot="scroll-area"]')
      expect(scrollArea).toBeInTheDocument()
      expect(
        container.querySelector('[data-slot="scroll-area-viewport"]')
      ).toBeInTheDocument()
      expect(screen.getByText("Item 1")).toBeVisible()

      const results = await axe.run(container)
      expect(results.violations).toEqual([])
    })
  })
})
