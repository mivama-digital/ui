import * as React from "react"
import { render, screen } from "@testing-library/react"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "../../src/components/ui/bubble.js"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "../../src/components/ui/item.js"
import { Kbd, KbdGroup } from "../../src/components/ui/kbd.js"
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from "../../src/components/ui/marker.js"
import { Label } from "../../src/components/ui/label.js"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "../../src/components/ui/native-select.js"
import { Spinner } from "../../src/components/ui/spinner.js"

describe("Phase 3 utility and native form primitives", () => {
  it("renders Bubble hierarchy and attributes without a11y violations", async () => {
    const { container } = render(
      <BubbleGroup>
        <Bubble variant="default" align="start">
          <BubbleContent>Incoming message</BubbleContent>
          <BubbleReactions side="bottom" align="end">
            <span>👍</span>
          </BubbleReactions>
        </Bubble>
        <Bubble variant="secondary" align="end">
          <BubbleContent>Outgoing reply</BubbleContent>
        </Bubble>
      </BubbleGroup>
    )

    expect(
      container.querySelector('[data-slot="bubble-group"]')
    ).toBeInTheDocument()
    const bubbles = container.querySelectorAll('[data-slot="bubble"]')
    expect(bubbles[0]).toHaveAttribute("data-align", "start")
    expect(bubbles[1]).toHaveAttribute("data-align", "end")
    expect(
      container.querySelector('[data-slot="bubble-reactions"]')
    ).toBeInTheDocument()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders Item collection with slots and proper list role", async () => {
    const { container } = render(
      <ItemGroup>
        <Item variant="outline" size="sm">
          <ItemMedia variant="icon">📄</ItemMedia>
          <ItemContent>
            <ItemTitle>File item</ItemTitle>
            <ItemDescription>Details</ItemDescription>
          </ItemContent>
          <ItemActions>
            <button type="button">Edit</button>
          </ItemActions>
        </Item>
        <ItemSeparator />
      </ItemGroup>
    )

    expect(screen.getByRole("list")).toHaveAttribute("data-slot", "item-group")
    expect(container.querySelector('[data-slot="item"]')).toHaveAttribute(
      "data-variant",
      "outline"
    )
    expect(
      container.querySelector('[data-slot="item-separator"]')
    ).toBeInTheDocument()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders Kbd and KbdGroup", async () => {
    const { container } = render(
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </KbdGroup>
    )

    expect(
      container.querySelector('[data-slot="kbd-group"]')
    ).toBeInTheDocument()
    const keys = container.querySelectorAll('[data-slot="kbd"]')
    expect(keys).toHaveLength(2)
    expect(keys[0]).toHaveTextContent("Ctrl")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders Marker with icons and separators", async () => {
    const { container } = render(
      <Marker variant="separator">
        <MarkerIcon>•</MarkerIcon>
        <MarkerContent>Divider point</MarkerContent>
      </Marker>
    )

    const marker = container.querySelector('[data-slot="marker"]')
    expect(marker).toHaveAttribute("data-variant", "separator")
    expect(
      container.querySelector('[data-slot="marker-icon"]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-slot="marker-content"]')
    ).toHaveTextContent("Divider point")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders accessible Label", async () => {
    const { container } = render(
      <div>
        <Label htmlFor="test-input">Test Label</Label>
        <input id="test-input" type="text" />
      </div>
    )

    const label = screen.getByText("Test Label")
    expect(label).toHaveAttribute("data-slot", "label")
    expect(label).toHaveAttribute("for", "test-input")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders NativeSelect with options and optgroups", async () => {
    const { container } = render(
      <NativeSelect defaultValue="opt1" aria-label="Choices">
        <NativeSelectOptGroup label="Group 1">
          <NativeSelectOption value="opt1">Option 1</NativeSelectOption>
          <NativeSelectOption value="opt2">Option 2</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    )

    const select = screen.getByRole("combobox", { name: "Choices" })
    expect(select).toHaveAttribute("data-slot", "native-select")
    expect(
      container.querySelector('[data-slot="native-select-icon"]')
    ).toBeInTheDocument()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders Spinner with status role and loading label", async () => {
    const { container } = render(<Spinner />)

    const spinner = screen.getByRole("status")
    expect(spinner).toHaveAttribute("data-slot", "spinner")
    expect(spinner).toHaveAttribute("aria-label", "Loading")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
