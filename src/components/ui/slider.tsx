"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "../../lib/utils.js"

export interface SliderProps extends SliderPrimitive.Root.Props {}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(function Slider(
  { className, ...props },
  ref
) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="relative flex w-full items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className="absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          className="block size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = "Slider"

const SliderTrack = React.forwardRef<
  HTMLDivElement,
  SliderPrimitive.Track.Props
>(function SliderTrack({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Track
      ref={ref}
      data-slot="slider-track"
      className={cn(
        "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        className
      )}
      {...props}
    />
  )
})
SliderTrack.displayName = "SliderTrack"

const SliderIndicator = React.forwardRef<
  HTMLDivElement,
  SliderPrimitive.Indicator.Props
>(function SliderIndicator({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Indicator
      ref={ref}
      data-slot="slider-indicator"
      className={cn(
        "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
        className
      )}
      {...props}
    />
  )
})
SliderIndicator.displayName = "SliderIndicator"

const SliderThumb = React.forwardRef<
  HTMLDivElement,
  SliderPrimitive.Thumb.Props
>(function SliderThumb({ className, ...props }, ref) {
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      data-slot="slider-thumb"
      className={cn(
        "block size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
SliderThumb.displayName = "SliderThumb"

export { Slider, SliderTrack, SliderIndicator, SliderThumb }
