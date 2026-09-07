import * as React from "react"
import { render, screen } from "@testing-library/react"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import { AspectRatio } from "../../src/components/ui/aspect-ratio.js"
import { Button } from "../../src/components/ui/button.js"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "../../src/components/ui/button-group.js"

describe("AspectRatio and ButtonGroup primitives", () => {
  it("renders AspectRatio with correct style and slot", async () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9} className="custom-ratio">
        <div>Content inside ratio</div>
      </AspectRatio>
    )

    const el = container.querySelector('[data-slot="aspect-ratio"]')
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass("custom-ratio")
    expect(el).toHaveStyle({ "--ratio": String(16 / 9) })
    expect(screen.getByText("Content inside ratio")).toBeVisible()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders ButtonGroup with horizontal and vertical orientation and sub-components", async () => {
    const { container, rerender } = render(
      <ButtonGroup orientation="horizontal">
        <ButtonGroupText>Actions</ButtonGroupText>
        <Button variant="outline">First</Button>
        <ButtonGroupSeparator />
        <Button variant="outline">Second</Button>
      </ButtonGroup>
    )

    const group = screen.getByRole("group")
    expect(group).toHaveAttribute("data-slot", "button-group")
    expect(group).toHaveAttribute("data-orientation", "horizontal")
    expect(
      container.querySelector('[data-slot="button-group-text"]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-slot="button-group-separator"]')
    ).toBeInTheDocument()

    let results = await axe.run(container)
    expect(results.violations).toEqual([])

    rerender(
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    )

    expect(group).toHaveAttribute("data-orientation", "vertical")
    results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
