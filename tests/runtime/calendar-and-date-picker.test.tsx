import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it, vi } from "vitest"

import { MivamaProvider } from "../../src/components/mivama-provider.js"
import { Calendar } from "../../src/components/ui/calendar.js"
import { DatePicker } from "../../src/components/ui/date-picker.js"

describe("Calendar runtime & accessibility", () => {
  it("renders month and handles date selection", async () => {
    const handleSelect = vi.fn()
    const testDate = new Date(2026, 8, 15) // Sep 15, 2026

    render(
      <Calendar
        mode="single"
        defaultMonth={testDate}
        selected={testDate}
        onSelect={handleSelect}
      />
    )

    const calendar = screen.getByRole("grid")
    expect(calendar).toBeInTheDocument()

    // Find a day button
    const dayButton = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent === "18")
    expect(dayButton).toBeDefined()
    if (dayButton) {
      fireEvent.click(dayButton)
      expect(handleSelect).toHaveBeenCalled()
    }

    const results = await axe.run(calendar)
    expect(results.violations).toEqual([])
  })
})

describe("DatePicker runtime & accessibility", () => {
  it("opens popover, selects date into portal container and updates value", async () => {
    const user = userEvent.setup()
    const portal = document.createElement("div")
    portal.dataset.testid = "date-picker-portal"
    document.body.append(portal)

    const handleDateChange = vi.fn()
    const testDate = new Date(2026, 8, 10)

    render(
      <MivamaProvider portalContainer={portal}>
        <DatePicker
          defaultDate={testDate}
          onDateChange={handleDateChange}
          calendarProps={{ defaultMonth: testDate }}
        />
      </MivamaProvider>
    )

    const trigger = screen.getByRole("button")
    expect(trigger).toHaveTextContent(testDate.toLocaleDateString())

    await user.click(trigger)

    const popoverContent = await screen.findByRole("dialog")
    expect(popoverContent).toBeInTheDocument()
    expect(portal).toContainElement(popoverContent)

    const day20 = screen
      .getAllByRole("button")
      .find((btn) => btn.textContent === "20")
    expect(day20).toBeDefined()
    if (day20) {
      await user.click(day20)
      expect(handleDateChange).toHaveBeenCalled()
      await waitFor(() => expect(popoverContent).not.toBeInTheDocument())
    }

    portal.remove()
  })
})
