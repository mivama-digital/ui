"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { useMivamaPortalContainer } from "../mivama-provider.js"
import { useShellAttributes } from "../../lib/shell-attributes.js"
import { cn } from "../../lib/utils.js"

function ContextMenu(props: ContextMenuPrimitive.Root.Props) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
}
ContextMenu.displayName = "ContextMenu"

const ContextMenuTrigger = React.forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.Trigger.Props
>(function ContextMenuTrigger(props, ref) {
  return (
    <ContextMenuPrimitive.Trigger
      ref={ref}
      data-slot="context-menu-trigger"
      {...props}
    />
  )
})
ContextMenuTrigger.displayName = "ContextMenuTrigger"

function ContextMenuGroup(props: ContextMenuPrimitive.Group.Props) {
  return (
    <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
  )
}
ContextMenuGroup.displayName = "ContextMenuGroup"

function ContextMenuPortal({
  container,
  ...props
}: ContextMenuPrimitive.Portal.Props) {
  const providerContainer = useMivamaPortalContainer()
  return (
    <ContextMenuPrimitive.Portal
      data-slot="context-menu-portal"
      container={container ?? providerContainer}
      {...props}
    />
  )
}
ContextMenuPortal.displayName = "ContextMenuPortal"

function ContextMenuSub(props: ContextMenuPrimitive.SubmenuRoot.Props) {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  )
}
ContextMenuSub.displayName = "ContextMenuSub"

function ContextMenuRadioGroup(props: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup"

interface ContextMenuSubTriggerProps
  extends ContextMenuPrimitive.SubmenuTrigger.Props {
  inset?: boolean
}

const ContextMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  ContextMenuSubTriggerProps
>(function ContextMenuSubTrigger(
  { className, inset, children, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      ref={ref}
      data-slot="context-menu-sub-trigger"
      data-inset={inset || undefined}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-[state=open]:bg-muted data-inset:pl-8 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
})
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger"

const ContextMenuSubContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.Popup.Props &
    Pick<ContextMenuPrimitive.Positioner.Props, "sideOffset" | "alignOffset">
>(function ContextMenuSubContent(
  { className, sideOffset = 2, alignOffset = -5, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.Positioner
      sideOffset={sideOffset}
      alignOffset={alignOffset}
    >
      <ContextMenuPrimitive.Popup
        ref={ref}
        data-slot="context-menu-sub-content"
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-lg border bg-popover p-1 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Positioner>
  )
})
ContextMenuSubContent.displayName = "ContextMenuSubContent"

interface ContextMenuContentProps
  extends
    ContextMenuPrimitive.Popup.Props,
    Pick<
      ContextMenuPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {}

const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuContentProps
>(function ContextMenuContent(
  {
    className,
    sideOffset = 4,
    align = "start",
    alignOffset = 0,
    side = "bottom",
    children,
    ...props
  },
  ref
) {
  useShellAttributes("[data-slot=context-menu-content]")

  return (
    <ContextMenuPortal>
      <ContextMenuPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        side={side}
      >
        <ContextMenuPrimitive.Popup
          ref={ref}
          data-slot="context-menu-content"
          className={cn(
            "z-50 min-w-36 overflow-hidden rounded-lg border bg-popover p-1 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPortal>
  )
})
ContextMenuContent.displayName = "ContextMenuContent"

interface ContextMenuItemProps extends ContextMenuPrimitive.Item.Props {
  inset?: boolean
  variant?: "default" | "destructive"
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  function ContextMenuItem(
    { className, inset, variant = "default", ...props },
    ref
  ) {
    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        data-slot="context-menu-item"
        data-variant={variant}
        data-inset={inset || undefined}
        className={cn(
          "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors motion-reduce:transition-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:data-highlighted:bg-destructive/10 [&>svg]:size-4 [&>svg]:shrink-0",
          className
        )}
        {...props}
      />
    )
  }
)
ContextMenuItem.displayName = "ContextMenuItem"

const ContextMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.CheckboxItem.Props & { inset?: boolean }
>(function ContextMenuCheckboxItem(
  { className, children, checked, inset, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      data-slot="context-menu-checkbox-item"
      data-inset={inset || undefined}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none transition-colors motion-reduce:transition-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-4" />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
})
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

const ContextMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.RadioItem.Props & { inset?: boolean }
>(function ContextMenuRadioItem(
  { className, children, value, inset, ...props },
  ref
) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      value={value}
      data-slot="context-menu-radio-item"
      data-inset={inset || undefined}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none transition-colors motion-reduce:transition-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
})
ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

interface ContextMenuLabelProps extends React.ComponentProps<"div"> {
  inset?: boolean
}

const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  ContextMenuLabelProps
>(function ContextMenuLabel({ className, inset, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="context-menu-label"
      data-inset={inset || undefined}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground data-inset:pl-8",
        className
      )}
      {...props}
    />
  )
})
ContextMenuLabel.displayName = "ContextMenuLabel"

const ContextMenuSeparator = React.forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.Separator.Props
>(function ContextMenuSeparator({ className, ...props }, ref) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
})
ContextMenuSeparator.displayName = "ContextMenuSeparator"

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
export type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuSubTriggerProps,
}
