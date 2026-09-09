import * as React from "react"
import { cn } from "@/lib/utils"

export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Attachment({ className, ...props }: AttachmentProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden rounded-md border border-border bg-background",
        className
      )}
      {...props}
    />
  )
}
