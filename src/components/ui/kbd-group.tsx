import * as React from "react"
import { Separator } from "./separator"
import { cn } from "@/lib/utils"

interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: boolean
  children: React.ReactNode
}

export interface KbdGroupPropsInternal extends KbdGroupProps {}

export function KbdGroup({
  separator = true,
  className,
  children,
  ...props
}: KbdGroupProps) {
  const nodes = Array.isArray(children) ? children : [children]
  const segment = nodes.filter((child) => React.isValidElement(child))

  return (
    <div
      className={`inline-flex gap-1 rounded border border-border bg-background p-1 text-foreground ${className || ""}`}
      {...props}
    >
      {segment.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {separator && index < segment.length - 1 && (
            <Separator orientation="vertical" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
