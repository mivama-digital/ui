import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axe from "axe-core"
import { describe, expect, it } from "vitest"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../src/components/ui/carousel.js"

describe("Carousel runtime & accessibility", () => {
  it("renders carousel region, slides, and navigation controls", async () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )

    const carousel = screen.getByRole("region")
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel")

    const slides = screen.getAllByRole("group")
    expect(slides).toHaveLength(3)
    expect(slides[0]).toHaveAttribute("aria-roledescription", "slide")
    expect(slides[0]).toHaveTextContent("Slide 1")

    const prevButton = screen.getByRole("button", { name: "Previous slide" })
    const nextButton = screen.getByRole("button", { name: "Next slide" })

    expect(prevButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()

    // Test keyboard interactions
    fireEvent.keyDown(carousel, { key: "ArrowRight" })
    fireEvent.keyDown(carousel, { key: "ArrowLeft" })

    const results = await axe.run(carousel)
    expect(results.violations).toEqual([])
  })
})
