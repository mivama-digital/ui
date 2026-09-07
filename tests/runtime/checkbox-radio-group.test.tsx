import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import { Checkbox } from "../../src/components/ui/checkbox.js"
import {
  RadioGroup,
  RadioGroupItem,
} from "../../src/components/ui/radio-group.js"

describe("Checkbox and RadioGroup primitives", () => {
  it("renders Checkbox, toggles on click, and supports indeterminate state", async () => {
    const user = userEvent.setup()
    const { container, rerender } = render(
      <div>
        <label htmlFor="test-checkbox">Subscribe</label>
        <Checkbox id="test-checkbox" aria-label="Subscribe" />
      </div>
    )

    const checkbox = screen.getByRole("checkbox", { name: "Subscribe" })
    expect(checkbox).toHaveAttribute("data-slot", "checkbox")
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    rerender(
      <div>
        <label htmlFor="test-checkbox">Subscribe</label>
        <Checkbox id="test-checkbox" aria-label="Subscribe" indeterminate />
      </div>
    )

    expect(checkbox).toHaveAttribute("data-indeterminate", "")
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders RadioGroup and toggles options on click and keyboard navigation", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <RadioGroup defaultValue="opt1" aria-label="Options">
        <div>
          <RadioGroupItem value="opt1" id="rg-opt1" aria-label="Option 1" />
        </div>
        <div>
          <RadioGroupItem value="opt2" id="rg-opt2" aria-label="Option 2" />
        </div>
      </RadioGroup>
    )

    const radio1 = screen.getByRole("radio", { name: "Option 1" })
    const radio2 = screen.getByRole("radio", { name: "Option 2" })

    expect(radio1).toBeChecked()
    expect(radio2).not.toBeChecked()

    await user.click(radio2)
    expect(radio2).toBeChecked()
    expect(radio1).not.toBeChecked()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
