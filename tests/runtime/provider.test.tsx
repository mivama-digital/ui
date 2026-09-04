import * as React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import {
  MivamaProvider,
  useMivamaContext,
  useMivamaPortalContainer,
  useOptionalMivamaContext,
} from "../../src/components/mivama-provider.js"

function PortalProbe() {
  const portalContainer = useMivamaPortalContainer()
  const resolved =
    portalContainer && "current" in portalContainer
      ? portalContainer.current
      : portalContainer

  return (
    <output data-testid="portal-probe">
      {resolved instanceof HTMLElement ? resolved.dataset.mivamaTheme : "none"}
    </output>
  )
}

describe("MivamaProvider", () => {
  it("applies default theme and density attributes", () => {
    render(
      <MivamaProvider data-testid="shell">
        <PortalProbe />
      </MivamaProvider>
    )

    const shell = screen.getByTestId("shell")
    expect(shell).toHaveAttribute("data-mivama-theme", "product")
    expect(shell).toHaveAttribute("data-density", "comfortable")
  })

  it("supports custom theme, density, className, and forwarded refs", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <MivamaProvider
        ref={ref}
        theme="dashboard"
        density="compact"
        className="custom-shell"
      />
    )

    expect(ref.current).toHaveAttribute("data-mivama-theme", "dashboard")
    expect(ref.current).toHaveAttribute("data-density", "compact")
    expect(ref.current).toHaveClass("custom-shell")
    expect(ref.current).not.toHaveClass("isolate")
  })

  it("provides typed context inside provider and throws outside provider", () => {
    let contextValue: ReturnType<typeof useMivamaContext> | null = null

    function Consumer() {
      contextValue = useMivamaContext()
      return <span>ready</span>
    }

    render(
      <MivamaProvider theme="portal" density="compact">
        <Consumer />
      </MivamaProvider>
    )

    expect(contextValue).not.toBeNull()
    expect(contextValue?.theme).toBe("portal")
    expect(contextValue?.density).toBe("compact")

    // Expect useMivamaContext to throw outside MivamaProvider
    expect(() => render(<Consumer />)).toThrow(
      "useMivamaContext must be used within a <MivamaProvider>"
    )

    // Expect useOptionalMivamaContext to return null outside MivamaProvider
    let optionalValue: unknown = undefined
    function OptionalConsumer() {
      optionalValue = useOptionalMivamaContext()
      return <span>optional</span>
    }

    render(<OptionalConsumer />)
    expect(optionalValue).toBeNull()
  })
})
