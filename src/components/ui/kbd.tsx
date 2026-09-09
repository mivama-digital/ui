import * as React from "react"
import { cn } from "@/lib/utils"

interface KbdProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Kbd({ className, ...props }: KbdProps) {
  return (
    <div
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[11px] font-medium shadow-sm",
        className
      )}
      {...props}
    />
  )
}
