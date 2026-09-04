"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { useMivamaPortalContainer } from "../mivama-provider.js"
import { useShellAttributes } from "../../lib/shell-attributes.js"
import { cn } from "../../lib/utils.js"

function Popover(props: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}
Popover.displayName = "Popover"

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverPrimitive.Trigger.Props
>(function PopoverTrigger(props, ref) {
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      data-slot="popover-trigger"
      {...props}
    />
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

function PopoverPortal({ container, ...props }: PopoverPrimitive.Portal.Props) {
  const providerContainer = useMivamaPortalContainer()
  return (
    <PopoverPrimitive.Portal
      data-slot="popover-portal"
      container={container ?? providerContainer}
      {...props}
    />
  )
}
PopoverPortal.displayName = "PopoverPortal"

interface PopoverContentProps extends PopoverPrimitive.Popup.Props {
  sideOffset?: number
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    {
      className,
      align = "center",
      sideOffset = 4,
      side = "bottom",
      children,
      ...props
    },
    ref
  ) {
    useShellAttributes("[data-slot=popover-content]")

    return (
      <PopoverPortal>
        <PopoverPrimitive.Positioner
          sideOffset={sideOffset}
          align={align}
          side={side}
        >
          <PopoverPrimitive.Popup
            ref={ref}
            data-slot="popover-content"
            className={cn(
              "z-50 w-72 rounded-xl border bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
              className
            )}
            {...props}
          >
            {children}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPortal>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  PopoverPrimitive.Close.Props
>(function PopoverClose(props, ref) {
  return (
    <PopoverPrimitive.Close ref={ref} data-slot="popover-close" {...props} />
  )
})
PopoverClose.displayName = "PopoverClose"

const PopoverTitle = React.forwardRef<
  HTMLHeadingElement,
  PopoverPrimitive.Title.Props
>(function PopoverTitle({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Title
      ref={ref}
      data-slot="popover-title"
      className={cn("font-heading text-base font-medium", className)}
      {...props}
    />
  )
})
PopoverTitle.displayName = "PopoverTitle"

const PopoverDescription = React.forwardRef<
  HTMLParagraphElement,
  PopoverPrimitive.Description.Props
>(function PopoverDescription({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Description
      ref={ref}
      data-slot="popover-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
PopoverDescription.displayName = "PopoverDescription"

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverPortal,
  PopoverTitle,
  PopoverDescription,
}
export type { PopoverContentProps }
