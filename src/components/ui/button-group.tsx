import * as React from "react"
import { Button } from "./button"

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export type { ButtonGroupProps }

export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return (
    <div
      className={`inline-flex rounded-md border border-border p-1 bg-background ${className || ""}`}
      {...props}
    />
  )
}
