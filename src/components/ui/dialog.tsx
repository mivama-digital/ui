"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { useMivamaPortalContainer } from "../mivama-provider.js"
import { useShellAttributes } from "../../lib/shell-attributes.js"
import { cn } from "../../lib/utils.js"
import { Button } from "./button.js"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}
Dialog.displayName = "Dialog"

const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitive.Trigger.Props
>(function DialogTrigger(props, ref) {
  return (
    <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props} />
  )
})
DialogTrigger.displayName = "DialogTrigger"

function DialogPortal({ container, ...props }: DialogPrimitive.Portal.Props) {
  const providerContainer = useMivamaPortalContainer()

  return (
    <DialogPrimitive.Portal
      data-slot="dialog-portal"
      container={container ?? providerContainer}
      {...props}
    />
  )
}
DialogPortal.displayName = "DialogPortal"

const DialogClose = React.forwardRef<
  HTMLButtonElement,
  DialogPrimitive.Close.Props
>(function DialogClose(props, ref) {
  return <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />
})
DialogClose.displayName = "DialogClose"

const DialogOverlay = React.forwardRef<
  HTMLDivElement,
  DialogPrimitive.Backdrop.Props
>(function DialogOverlay({ className, ...props }, ref) {
  useShellAttributes("[data-slot=dialog-overlay]")

  return (
    <DialogPrimitive.Backdrop
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-overlay duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
})
DialogOverlay.displayName = "DialogOverlay"

export interface DialogContentProps extends DialogPrimitive.Popup.Props {
  showCloseButton?: boolean
  closeLabel?: string
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  function DialogContent(
    {
      className,
      children,
      showCloseButton = true,
      closeLabel = "Close",
      ...props
    },
    ref
  ) {
    useShellAttributes("[data-slot=dialog-content]")

    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          ref={ref}
          data-slot="dialog-content"
          className={cn(
            "fixed top-1/2 left-1/2 z-50 grid max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem)] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto overscroll-contain rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            showCloseButton &&
              "[&>[data-slot=dialog-header]]:pr-12 [&>[data-slot=dialog-title]]:pr-12",
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              render={
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2"
                  size="icon-sm"
                />
              }
            >
              <XIcon />
              <span className="sr-only">{closeLabel}</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogPortal>
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function DialogHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
})
DialogHeader.displayName = "DialogHeader"

export interface DialogFooterProps extends React.ComponentProps<"div"> {
  showCloseButton?: boolean
  closeLabel?: string
}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter(
    {
      className,
      showCloseButton = false,
      closeLabel = "Close",
      children,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-slot="dialog-footer"
        className={cn(
          "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close render={<Button variant="outline" />}>
            {closeLabel}
          </DialogPrimitive.Close>
        )}
      </div>
    )
  }
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogPrimitive.Title.Props
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
})
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogPrimitive.Description.Props
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
})
DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
