import * as React from "react"
import { render, screen } from "@testing-library/react"
import axe from "axe-core"
import { Bar, BarChart } from "recharts"
import { describe, expect, it } from "vitest"

import {
  ChartContainer,
  ChartContext,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../src/components/ui/chart.js"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

describe("Chart runtime & accessibility", () => {
  it("renders chart container with data-slot and generated color CSS variables", async () => {
    const { container } = render(
      <ChartContainer config={chartConfig} className="min-h-[200px]">
        <BarChart data={chartData}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    )

    const chartEl = container.querySelector("[data-slot='chart']")
    expect(chartEl).toBeInTheDocument()

    const styleEl = container.querySelector("style")
    expect(styleEl).toBeInTheDocument()
    expect(styleEl?.innerHTML).toContain("--color-desktop: var(--chart-1);")
    expect(styleEl?.innerHTML).toContain("--color-mobile: var(--chart-2);")

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders tooltip content with semantic items and values", async () => {
    const { container } = render(
      <ChartContext.Provider value={{ config: chartConfig }}>
        <ChartTooltipContent
          active
          payload={[
            {
              name: "desktop",
              dataKey: "desktop",
              value: 186,
              color: "var(--chart-1)",
              payload: { month: "January", desktop: 186 },
            },
          ]}
          label="January"
        />
      </ChartContext.Provider>
    )

    expect(screen.getByText("Desktop")).toBeInTheDocument()
    expect(screen.getByText("186")).toBeInTheDocument()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("renders legend content with configured items", async () => {
    const { container } = render(
      <ChartContext.Provider value={{ config: chartConfig }}>
        <ChartLegendContent
          payload={[
            {
              value: "desktop",
              dataKey: "desktop",
              color: "var(--chart-1)",
            },
            {
              value: "mobile",
              dataKey: "mobile",
              color: "var(--chart-2)",
            },
          ]}
        />
      </ChartContext.Provider>
    )

    expect(screen.getByText("Desktop")).toBeInTheDocument()
    expect(screen.getByText("Mobile")).toBeInTheDocument()

    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })

  it("safely handles empty data payload without crashing", async () => {
    const { container } = render(
      <ChartContext.Provider value={{ config: chartConfig }}>
        <ChartTooltipContent active={false} payload={[]} />
      </ChartContext.Provider>
    )

    expect(
      container.querySelector("[data-slot='chart-tooltip-content']")
    ).toBeNull()
  })
})
