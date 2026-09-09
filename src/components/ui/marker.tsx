import * as React from "react"
import { cn } from "@/lib/utils"

interface MarkerProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Marker({ className, ...props }: MarkerProps) {
  return (
    <span className={cn("rounded bg-muted px-0.5", className)} {...props} />
  )
}
