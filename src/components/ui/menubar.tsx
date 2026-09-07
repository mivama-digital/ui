"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { useMivamaPortalContainer } from "../mivama-provider.js"
import { useShellAttributes } from "../../lib/shell-attributes.js"
import { cn } from "../../lib/utils.js"

const Menubar = React.forwardRef<HTMLDivElement, MenubarPrimitive.Props>(
  function Menubar({ className, ...props }, ref) {
    return (
      <MenubarPrimitive
        ref={ref}
        data-slot="menubar"
        className={cn(
          "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
          className
        )}
        {...props}
      />
    )
  }
)
Menubar.displayName = "Menubar"

function MenubarMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="menubar-menu" {...props} />
}
MenubarMenu.displayName = "MenubarMenu"

function MenubarGroup(props: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="menubar-group" {...props} />
}
MenubarGroup.displayName = "MenubarGroup"

function MenubarPortal({ container, ...props }: MenuPrimitive.Portal.Props) {
  const providerContainer = useMivamaPortalContainer()
  return (
    <MenuPrimitive.Portal
      data-slot="menubar-portal"
      container={container ?? providerContainer}
      {...props}
    />
  )
}
MenubarPortal.displayName = "MenubarPortal"

function MenubarRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}
MenubarRadioGroup.displayName = "MenubarRadioGroup"

function MenubarSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="menubar-sub" {...props} />
}
MenubarSub.displayName = "MenubarSub"

const MenubarTrigger = React.forwardRef<
  HTMLButtonElement,
  MenuPrimitive.Trigger.Props
>(function MenubarTrigger({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      data-slot="menubar-trigger"
      className={cn(
        "flex cursor-pointer items-center rounded-sm px-2 py-1 text-sm font-medium outline-none select-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-popup-open:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground",
        className
      )}
      {...props}
    />
  )
})
MenubarTrigger.displayName = "MenubarTrigger"

interface MenubarContentProps
  extends
    MenuPrimitive.Popup.Props,
    Pick<
      MenuPrimitive.Positioner.Props,
      "align" | "alignOffset" | "side" | "sideOffset"
    > {}

const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  function MenubarContent(
    {
      className,
      align = "start",
      alignOffset = -4,
      sideOffset = 8,
      side = "bottom",
      children,
      ...props
    },
    ref
  ) {
    useShellAttributes("[data-slot=menubar-content]")

    return (
      <MenubarPortal>
        <MenuPrimitive.Positioner
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          side={side}
        >
          <MenuPrimitive.Popup
            ref={ref}
            data-slot="menubar-content"
            className={cn(
              "z-50 min-w-48 overflow-hidden rounded-lg border bg-popover p-1 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
              className
            )}
            {...props}
          >
            {children}
          </MenuPrimitive.Popup>
        </MenuPrimitive.Positioner>
      </MenubarPortal>
    )
  }
)
MenubarContent.displayName = "MenubarContent"

interface MenubarItemProps extends MenuPrimitive.Item.Props {
  inset?: boolean
  variant?: "default" | "destructive"
}

const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  function MenubarItem(
    { className, inset, variant = "default", ...props },
    ref
  ) {
    return (
      <MenuPrimitive.Item
        ref={ref}
        data-slot="menubar-item"
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
MenubarItem.displayName = "MenubarItem"

const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.CheckboxItem.Props & { inset?: boolean }
>(function MenubarCheckboxItem(
  { className, children, checked, inset, ...props },
  ref
) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      checked={checked}
      data-slot="menubar-checkbox-item"
      data-inset={inset || undefined}
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
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

const MenubarRadioItem = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.RadioItem.Props & { inset?: boolean }
>(function MenubarRadioItem(
  { className, children, value, inset, ...props },
  ref
) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      value={value}
      data-slot="menubar-radio-item"
      data-inset={inset || undefined}
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
MenubarRadioItem.displayName = "MenubarRadioItem"

interface MenubarLabelProps extends React.ComponentProps<"div"> {
  inset?: boolean
}

const MenubarLabel = React.forwardRef<HTMLDivElement, MenubarLabelProps>(
  function MenubarLabel({ className, inset, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="menubar-label"
        data-inset={inset || undefined}
        className={cn(
          "px-2 py-1.5 text-xs font-semibold text-muted-foreground data-inset:pl-8",
          className
        )}
        {...props}
      />
    )
  }
)
MenubarLabel.displayName = "MenubarLabel"

const MenubarSeparator = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.Separator.Props
>(function MenubarSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
})
MenubarSeparator.displayName = "MenubarSeparator"

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayName = "MenubarShortcut"

interface MenubarSubTriggerProps extends MenuPrimitive.SubmenuTrigger.Props {
  inset?: boolean
}

const MenubarSubTrigger = React.forwardRef<
  HTMLDivElement,
  MenubarSubTriggerProps
>(function MenubarSubTrigger({ className, inset, children, ...props }, ref) {
  return (
    <MenuPrimitive.SubmenuTrigger
      ref={ref}
      data-slot="menubar-sub-trigger"
      data-inset={inset || undefined}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground data-[state=open]:bg-muted data-inset:pl-8 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </MenuPrimitive.SubmenuTrigger>
  )
})
MenubarSubTrigger.displayName = "MenubarSubTrigger"

const MenubarSubContent = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.Popup.Props &
    Pick<MenuPrimitive.Positioner.Props, "sideOffset" | "alignOffset">
>(function MenubarSubContent(
  { className, sideOffset = 2, alignOffset = -5, ...props },
  ref
) {
  return (
    <MenuPrimitive.Positioner sideOffset={sideOffset} alignOffset={alignOffset}>
      <MenuPrimitive.Popup
        ref={ref}
        data-slot="menubar-sub-content"
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-lg border bg-popover p-1 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/10 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </MenuPrimitive.Positioner>
  )
})
MenubarSubContent.displayName = "MenubarSubContent"

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
export type {
  MenubarContentProps,
  MenubarItemProps,
  MenubarLabelProps,
  MenubarSubTriggerProps,
}
