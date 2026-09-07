"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { useMivamaPortalContainer } from "../mivama-provider.js"
import { useShellAttributes } from "../../lib/shell-attributes.js"
import { cn } from "../../lib/utils.js"

function HoverCard(props: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}
HoverCard.displayName = "HoverCard"

const HoverCardTrigger = React.forwardRef<
  HTMLAnchorElement,
  PreviewCardPrimitive.Trigger.Props
>(function HoverCardTrigger(props, ref) {
  return (
    <PreviewCardPrimitive.Trigger
      ref={ref}
      data-slot="hover-card-trigger"
      {...props}
    />
  )
})
HoverCardTrigger.displayName = "HoverCardTrigger"

function HoverCardPortal({
  container,
  ...props
}: PreviewCardPrimitive.Portal.Props) {
  const providerContainer = useMivamaPortalContainer()
  return (
    <PreviewCardPrimitive.Portal
      data-slot="hover-card-portal"
      container={container ?? providerContainer}
      {...props}
    />
  )
}
HoverCardPortal.displayName = "HoverCardPortal"

interface HoverCardContentProps extends PreviewCardPrimitive.Popup.Props {
  sideOffset?: number
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  alignOffset?: number
}

const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(function HoverCardContent(
  {
    className,
    align = "center",
    sideOffset = 4,
    side = "bottom",
    alignOffset = 0,
    children,
    ...props
  },
  ref
) {
  useShellAttributes("[data-slot=hover-card-content]")

  return (
    <HoverCardPortal>
      <PreviewCardPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        side={side}
        alignOffset={alignOffset}
        className="isolate z-50 outline-none"
      >
        <PreviewCardPrimitive.Popup
          ref={ref}
          data-slot="hover-card-content"
          className={cn(
            "z-50 w-64 rounded-xl border bg-popover p-4 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </HoverCardPortal>
  )
})
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal }
export type { HoverCardContentProps }
