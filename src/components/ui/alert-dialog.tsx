"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

import { useMivamaPortalContainer } from "../mivama-provider.js"
import { useShellAttributes } from "../../lib/shell-attributes.js"
import { cn } from "../../lib/utils.js"
import { Button } from "./button.js"

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}
AlertDialog.displayName = "AlertDialog"

const AlertDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  AlertDialogPrimitive.Trigger.Props
>(function AlertDialogTrigger(props, ref) {
  return (
    <AlertDialogPrimitive.Trigger
      ref={ref}
      data-slot="alert-dialog-trigger"
      {...props}
    />
  )
})
AlertDialogTrigger.displayName = "AlertDialogTrigger"

function AlertDialogPortal({
  container,
  ...props
}: AlertDialogPrimitive.Portal.Props) {
  const providerContainer = useMivamaPortalContainer()

  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      container={container ?? providerContainer}
      {...props}
    />
  )
}
AlertDialogPortal.displayName = "AlertDialogPortal"

const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  AlertDialogPrimitive.Backdrop.Props
>(function AlertDialogOverlay({ className, ...props }, ref) {
  useShellAttributes("[data-slot=alert-dialog-overlay]")

  return (
    <AlertDialogPrimitive.Backdrop
      ref={ref}
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
})
AlertDialogOverlay.displayName = "AlertDialogOverlay"

interface AlertDialogContentProps extends AlertDialogPrimitive.Popup.Props {}

const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogContentProps
>(function AlertDialogContent({ className, children, ...props }, ref) {
  useShellAttributes("[data-slot=alert-dialog-content]")

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        ref={ref}
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto overscroll-contain rounded-xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Popup>
    </AlertDialogPortal>
  )
})
AlertDialogContent.displayName = "AlertDialogContent"

const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function AlertDialogHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
})
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function AlertDialogFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
})
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialogPrimitive.Title.Props
>(function AlertDialogTitle({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={cn(
        "font-heading text-lg leading-none font-semibold",
        className
      )}
      {...props}
    />
  )
})
AlertDialogTitle.displayName = "AlertDialogTitle"

const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogPrimitive.Description.Props
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
})
AlertDialogDescription.displayName = "AlertDialogDescription"

interface AlertDialogActionProps extends AlertDialogPrimitive.Close.Props {
  variant?: "default" | "destructive"
}

const AlertDialogAction = React.forwardRef<
  HTMLButtonElement,
  AlertDialogActionProps
>(function AlertDialogAction(
  { className, variant = "default", ...props },
  ref
) {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-action"
      render={<Button variant={variant} className={className} />}
      {...props}
    />
  )
})
AlertDialogAction.displayName = "AlertDialogAction"

const AlertDialogCancel = React.forwardRef<
  HTMLButtonElement,
  AlertDialogPrimitive.Close.Props
>(function AlertDialogCancel({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-cancel"
      render={<Button variant="outline" className={className} />}
      {...props}
    />
  )
})
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
export type { AlertDialogActionProps, AlertDialogContentProps }
