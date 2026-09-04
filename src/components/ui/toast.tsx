"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { XIcon } from "lucide-react"

import { useMivamaPortalContainer } from "../mivama-provider.js"
import { useShellAttributes } from "../../lib/shell-attributes.js"
import { cn } from "../../lib/utils.js"

const defaultToastManager = ToastPrimitive.createToastManager()

interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  variant?: "default" | "destructive"
  timeout?: number
}

function toast({
  title,
  description,
  action,
  variant = "default",
  timeout = 5000,
}: ToastOptions) {
  return defaultToastManager.add({
    title,
    description,
    type: variant,
    timeout,
    data: { action, variant },
  })
}

toast.success = (
  title: React.ReactNode,
  options?: Omit<ToastOptions, "title">
) => toast({ title, variant: "default", ...options })

toast.error = (
  title: React.ReactNode,
  options?: Omit<ToastOptions, "title" | "variant">
) => toast({ title, variant: "destructive", ...options })

toast.dismiss = (id?: string) => defaultToastManager.close(id)

interface ToasterProps extends React.ComponentProps<"div"> {
  toastManager?: ReturnType<typeof ToastPrimitive.createToastManager>
}

function Toaster({
  toastManager = defaultToastManager,
  className,
  ...props
}: ToasterProps) {
  const providerContainer = useMivamaPortalContainer()
  useShellAttributes("[data-slot=toast-viewport]")

  const toasts = ToastPrimitive.useToastManager().toasts

  return (
    <ToastPrimitive.Portal container={providerContainer}>
      <ToastPrimitive.Viewport
        data-slot="toast-viewport"
        className={cn(
          "fixed bottom-0 right-0 z-50 m-4 flex max-h-screen w-full max-w-sm flex-col-reverse gap-2 outline-none sm:bottom-0 sm:right-0",
          className
        )}
        {...props}
      >
        {toasts.map((t) => (
          <ToastPrimitive.Root
            key={t.id}
            toast={t}
            data-slot="toast"
            data-variant={
              (t.data as { variant?: string } | undefined)?.variant ??
              t.type ??
              "default"
            }
            className={cn(
              "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-lg ring-1 ring-foreground/10 transition-all data-open:animate-in data-open:slide-in-from-bottom-5 data-closed:animate-out data-closed:fade-out-80 data-closed:slide-out-to-right-full data-[variant=destructive]:border-destructive-border data-[variant=destructive]:bg-destructive-subtle data-[variant=destructive]:text-destructive-foreground"
            )}
          >
            <div className="grid gap-1 pr-6">
              {t.title && (
                <ToastPrimitive.Title
                  data-slot="toast-title"
                  className="text-sm font-semibold"
                >
                  {t.title}
                </ToastPrimitive.Title>
              )}
              {t.description && (
                <ToastPrimitive.Description
                  data-slot="toast-description"
                  className="text-xs text-muted-foreground group-data-[variant=destructive]:text-destructive-foreground/80"
                >
                  {t.description}
                </ToastPrimitive.Description>
              )}
            </div>
            {(
              t.data as
                { action?: { label: string; onClick: () => void } } | undefined
            )?.action && (
              <button
                type="button"
                onClick={
                  (t.data as { action: { label: string; onClick: () => void } })
                    .action.onClick
                }
                className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-input bg-transparent px-3 text-xs font-medium transition-colors hover:bg-muted focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {
                  (t.data as { action: { label: string; onClick: () => void } })
                    .action.label
                }
              </button>
            )}
            <ToastPrimitive.Close
              data-slot="toast-close"
              className="absolute top-2 right-2 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none"
            >
              <XIcon className="size-4" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  )
}

function ToastRootProvider({
  children,
  toastManager = defaultToastManager,
}: {
  children?: React.ReactNode
  toastManager?: ReturnType<typeof ToastPrimitive.createToastManager>
}) {
  return (
    <ToastPrimitive.Provider toastManager={toastManager}>
      {children}
      <Toaster toastManager={toastManager} />
    </ToastPrimitive.Provider>
  )
}
ToastRootProvider.displayName = "ToastRootProvider"

export { toast, defaultToastManager, Toaster, ToastRootProvider }
export type { ToastOptions, ToasterProps }
