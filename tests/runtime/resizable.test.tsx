import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../src/components/ui/resizable.js"

describe("Resizable runtime & accessibility", () => {
  it("renders panel group with panels and separator handle", async () => {
    const { container } = render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={50} minSize={20}>
          <div>Panel 1</div>
        </ResizablePanel>
        <ResizableHandle withHandle id="handle-1" />
        <ResizablePanel defaultSize={50}>
          <div>Panel 2</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )

    const group = container.querySelector("[data-slot='resizable-panel-group']")
    expect(group).toBeInTheDocument()

    const panels = container.querySelectorAll("[data-slot='resizable-panel']")
    expect(panels).toHaveLength(2)

    const handle = container.querySelector("[data-slot='resizable-handle']")
    expect(handle).toBeInTheDocument()
    expect(handle).toHaveAttribute("role", "separator")
    expect(handle).toHaveAttribute("aria-orientation", "vertical")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("supports vertical orientation", async () => {
    const { container } = render(
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize={40}>
          <div>Top Panel</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <div>Bottom Panel</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    )

    const group = container.querySelector("[data-slot='resizable-panel-group']")
    expect(group).toBeInTheDocument()

    const handle = container.querySelector("[data-slot='resizable-handle']")
    expect(handle).toHaveAttribute("role", "separator")
    expect(handle).toHaveAttribute("aria-orientation", "horizontal")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
