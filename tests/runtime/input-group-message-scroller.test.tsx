import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../src/components/ui/input-group.js"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "../../src/components/ui/message-scroller.js"

describe("InputGroup and MessageScroller primitives", () => {
  it("renders InputGroup with prefix/suffix addons and allows focus", async () => {
    const user = userEvent.setup()
    let buttonClicked = false

    const { container } = render(
      <InputGroup>
        <InputGroupAddon align="inline-start">https://</InputGroupAddon>
        <InputGroupInput aria-label="Domain input" placeholder="example.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="xs"
            onClick={() => {
              buttonClicked = true
            }}
          >
            Copy
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    )

    const group = container.querySelector('[data-slot="input-group"]')
    expect(group).toBeInTheDocument()
    expect(group).toHaveAttribute("role", "group")

    const addons = container.querySelectorAll('[data-slot="input-group-addon"]')
    expect(addons).toHaveLength(2)
    expect(addons[0]).toHaveAttribute("data-align", "inline-start")
    expect(addons[1]).toHaveAttribute("data-align", "inline-end")

    const btn = screen.getByRole("button", { name: "Copy" })
    await user.click(btn)
    expect(buttonClicked).toBe(true)

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders MessageScroller hierarchy with viewport and scroll button", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <MessageScroller className="h-64 w-80">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            <MessageScrollerItem messageId="msg-1">First</MessageScrollerItem>
            <MessageScrollerItem messageId="msg-2" scrollAnchor>
              Second
            </MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    )

    expect(
      container.querySelector('[data-slot="message-scroller"]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-slot="message-scroller-viewport"]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-slot="message-scroller-content"]')
    ).toBeInTheDocument()

    const items = container.querySelectorAll(
      '[data-slot="message-scroller-item"]'
    )
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveAttribute("data-message-id", "msg-1")
    expect(items[1]).toHaveAttribute("data-scroll-anchor", "true")

    const button = screen.getByRole("button", { name: "Scroll to end" })
    expect(button).toHaveAttribute("data-direction", "end")
    await user.click(button)

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
