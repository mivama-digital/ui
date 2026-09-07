import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import { Toggle } from "../../src/components/ui/toggle.js"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../src/components/ui/toggle-group.js"

describe("Toggle runtime & accessibility", () => {
  it("renders with default pressed state and toggles on click", async () => {
    const user = userEvent.setup()
    render(<Toggle aria-label="Toggle mute">Mute</Toggle>)

    const button = screen.getByRole("button", { name: "Toggle mute" })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute("aria-pressed", "false")

    await user.click(button)
    expect(button).toHaveAttribute("aria-pressed", "true")

    await user.click(button)
    expect(button).toHaveAttribute("aria-pressed", "false")

    const results = await axe.run(button)
    expect(results.violations).toEqual([])
  })

  it("supports controlled pressed prop and custom variants", () => {
    const { rerender } = render(
      <Toggle pressed variant="outline" size="sm" aria-label="Pin">
        Pin
      </Toggle>
    )

    const button = screen.getByRole("button", { name: "Pin" })
    expect(button).toHaveAttribute("aria-pressed", "true")
    expect(button.className).toContain("h-8")

    rerender(
      <Toggle pressed={false} variant="outline" size="sm" aria-label="Pin">
        Pin
      </Toggle>
    )
    expect(button).toHaveAttribute("aria-pressed", "false")
  })
})

describe("ToggleGroup runtime & accessibility", () => {
  it("manages single selection", async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup type="single" defaultValue="bold" aria-label="Text format">
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          U
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const bold = screen.getByRole("button", { name: "Bold" })
    const italic = screen.getByRole("button", { name: "Italic" })

    expect(bold).toHaveAttribute("aria-pressed", "true")
    expect(italic).toHaveAttribute("aria-pressed", "false")

    await user.click(italic)
    expect(bold).toHaveAttribute("aria-pressed", "false")
    expect(italic).toHaveAttribute("aria-pressed", "true")

    const group = screen.getByRole("group", { name: "Text format" })
    const results = await axe.run(group)
    expect(results.violations).toEqual([])
  })

  it("manages multiple selection", async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup
        type="multiple"
        defaultValue={["bold", "italic"]}
        aria-label="Text styling"
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          B
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          I
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          U
        </ToggleGroupItem>
      </ToggleGroup>
    )

    const bold = screen.getByRole("button", { name: "Bold" })
    const italic = screen.getByRole("button", { name: "Italic" })
    const underline = screen.getByRole("button", { name: "Underline" })

    expect(bold).toHaveAttribute("aria-pressed", "true")
    expect(italic).toHaveAttribute("aria-pressed", "true")
    expect(underline).toHaveAttribute("aria-pressed", "false")

    await user.click(underline)
    expect(underline).toHaveAttribute("aria-pressed", "true")
    expect(bold).toHaveAttribute("aria-pressed", "true")

    await user.click(bold)
    expect(bold).toHaveAttribute("aria-pressed", "false")
  })
})
