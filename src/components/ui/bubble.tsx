import * as React from "react"
import { cn } from "@/lib/utils"

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received"
}

export function Bubble({
  variant = "received",
  className,
  ...props
}: BubbleProps) {
  return (
    <div
      className={cn(
        "relative flex max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
        variant === "sent"
          ? "ml-auto rounded-br-sm bg-primary text-primary-foreground"
          : "rounded-bl-sm bg-muted text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
