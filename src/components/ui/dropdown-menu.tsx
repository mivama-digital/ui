"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { useMivamaPortalContainer } from "../mivama-provider.js"
import { useShellAttributes } from "../../lib/shell-attributes.js"
import { cn } from "../../lib/utils.js"

function DropdownMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}
DropdownMenu.displayName = "DropdownMenu"

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  MenuPrimitive.Trigger.Props
>(function DropdownMenuTrigger(props, ref) {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

function DropdownMenuGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}
DropdownMenuGroup.displayName = "DropdownMenuGroup"

function DropdownMenuPortal({
  container,
  ...props
}: MenuPrimitive.Portal.Props) {
  const providerContainer = useMivamaPortalContainer()
  return (
    <MenuPrimitive.Portal
      data-slot="dropdown-menu-portal"
      container={container ?? providerContainer}
      {...props}
    />
  )
}
DropdownMenuPortal.displayName = "DropdownMenuPortal"

function DropdownMenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}
DropdownMenuSub.displayName = "DropdownMenuSub"

function DropdownMenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup"

interface DropdownMenuSubTriggerProps
  extends MenuPrimitive.SubmenuTrigger.Props {
  inset?: boolean
}

const DropdownMenuSubTrigger = React.forwardRef<
  HTMLDivElement,
  DropdownMenuSubTriggerProps
>(function DropdownMenuSubTrigger(
  { className, inset, children, ...props },
  ref
) {
  return (
    <MenuPrimitive.SubmenuTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset || undefined}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-[state=open]:bg-muted data-[inset]:pl-8 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenuPrimitive.SubmenuTrigger>
  )
})
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuSubContent = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.Popup.Props
>(function DropdownMenuSubContent({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Positioner sideOffset={2} alignOffset={-5}>
      <MenuPrimitive.Popup
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-lg border bg-popover p-1 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </MenuPrimitive.Positioner>
  )
})
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

interface DropdownMenuContentProps extends MenuPrimitive.Popup.Props {
  sideOffset?: number
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(function DropdownMenuContent(
  {
    className,
    sideOffset = 4,
    align = "start",
    side = "bottom",
    children,
    ...props
  },
  ref
) {
  useShellAttributes("[data-slot=dropdown-menu-content]")

  return (
    <DropdownMenuPortal>
      <MenuPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        side={side}
      >
        <MenuPrimitive.Popup
          ref={ref}
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 min-w-36 overflow-hidden rounded-lg border bg-popover p-1 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </DropdownMenuPortal>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

interface DropdownMenuItemProps extends MenuPrimitive.Item.Props {
  inset?: boolean
  variant?: "default" | "destructive"
}

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps
>(function DropdownMenuItem(
  { className, inset, variant = "default", ...props },
  ref
) {
  return (
    <MenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      data-inset={inset || undefined}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors motion-reduce:transition-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:data-highlighted:bg-destructive/10 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.CheckboxItem.Props
>(function DropdownMenuCheckboxItem(
  { className, children, checked, ...props },
  ref
) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none transition-colors motion-reduce:transition-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-4" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
})
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.RadioItem.Props
>(function DropdownMenuRadioItem(
  { className, children, value, ...props },
  ref
) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      value={value}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md py-1.5 pr-2 pl-8 text-sm outline-none transition-colors motion-reduce:transition-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
})
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

interface DropdownMenuLabelProps extends React.ComponentProps<"div"> {
  inset?: boolean
}

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  DropdownMenuLabelProps
>(function DropdownMenuLabel({ className, inset, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="dropdown-menu-label"
      data-inset={inset || undefined}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.Separator.Props
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
})
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
export type {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSubTriggerProps,
}
