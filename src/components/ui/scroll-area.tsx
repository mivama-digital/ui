"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "../../lib/utils.js"

export interface ScrollAreaProps extends ScrollAreaPrimitive.Root.Props {}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  function ScrollArea({ className, children, ...props }, ref) {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        data-slot="scroll-area"
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          data-slot="scroll-area-viewport"
          className="size-full rounded-[inherit]"
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    )
  }
)
ScrollArea.displayName = "ScrollArea"

export interface ScrollBarProps extends ScrollAreaPrimitive.Scrollbar.Props {}

const ScrollBar = React.forwardRef<HTMLDivElement, ScrollBarProps>(
  function ScrollBar({ className, orientation = "vertical", ...props }, ref) {
    return (
      <ScrollAreaPrimitive.Scrollbar
        ref={ref}
        data-slot="scroll-area-scrollbar"
        orientation={orientation}
        className={cn(
          "flex touch-none select-none transition-colors duration-150 ease-out",
          orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent p-px",
          orientation === "horizontal" &&
            "h-2.5 flex-col border-t border-t-transparent p-px",
          className
        )}
        {...props}
      >
        <ScrollAreaPrimitive.Thumb
          data-slot="scroll-area-thumb"
          className="relative flex-1 rounded-full bg-border hover:bg-muted-foreground/40 transition-colors"
        />
      </ScrollAreaPrimitive.Scrollbar>
    )
  }
)
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }
