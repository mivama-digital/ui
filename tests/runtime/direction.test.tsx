import * as React from "react"
import { render, screen } from "@testing-library/react"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import { DirectionProvider } from "../../src/components/ui/direction.js"
import { useDirection } from "../../src/hooks/use-direction.js"

function Consumer() {
  const dir = useDirection()
  return <div data-testid="dir-consumer">{dir}</div>
}

describe("DirectionProvider and useDirection", () => {
  it("provides and propagates reading direction", async () => {
    const { container, rerender } = render(
      <DirectionProvider dir="ltr">
        <Consumer />
      </DirectionProvider>
    )

    expect(screen.getByTestId("dir-consumer")).toHaveTextContent("ltr")

    rerender(
      <DirectionProvider dir="rtl">
        <Consumer />
      </DirectionProvider>
    )

    expect(screen.getByTestId("dir-consumer")).toHaveTextContent("rtl")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("handles nested direction providers correctly", () => {
    render(
      <DirectionProvider dir="ltr">
        <div data-testid="outer">
          <Consumer />
          <DirectionProvider dir="rtl">
            <div data-testid="inner">
              <Consumer />
            </div>
          </DirectionProvider>
        </div>
      </DirectionProvider>
    )

    const consumers = screen.getAllByTestId("dir-consumer")
    expect(consumers[0]).toHaveTextContent("ltr")
    expect(consumers[1]).toHaveTextContent("rtl")
  })
})
